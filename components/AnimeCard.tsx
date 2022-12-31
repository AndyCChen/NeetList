import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useRef, useState, useMemo, RefObject } from 'react';

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	id: string,
	coverImageUrl: string,
	title: string,
	season: string,
	seasonYear: number,
	studio: string,
	format: string,
	episodes: string,
	genres: string[],
	isLastItem?: boolean,
};

const getFormat = (format: string): string => {
	switch (format) {
		case 'TV':
			return 'TV Show';
		case 'TV_SHORT':
			return 'TV Short';
		case 'MOVIE':
			return 'Movie';
		case 'SPECIAL':
			return 'Special';
		case 'OVA':
			return 'Ova';
		case 'ONA':
			return 'Ona';
		default:
			return '';
	};
}

const AnimeCard = ({ id, coverImageUrl, title, season, seasonYear, studio, format, episodes, genres, isLastItem = false }: Props)=> {

	const useIsInViewport = (ref: RefObject<HTMLDivElement>): boolean => {
		const [isIntersectingViewport, setIsIntersectingViewport] = useState(false);
		
		const observer = useMemo((): IntersectionObserver => {
			return new IntersectionObserver(([entry]) => setIsIntersectingViewport(entry.isIntersecting));
		}, []);

		useEffect(() => {
			observer.observe(ref.current as Element);

			return () => {
				observer.disconnect();
			}
		}, [ref, observer]);

		return isIntersectingViewport;
	};

	const handleResize = () => {
		const animeCardBoundingRect = animeCardRef.current?.getBoundingClientRect();
		const rightOffset = animeCardBoundingRect?.right;
		const toolTipWidth = toolTipRef.current?.clientWidth;

		if (rightOffset == undefined || toolTipWidth == undefined) {
			return;
		}

		const rightRemainingPixels =  window.innerWidth - rightOffset;
		
		if (rightRemainingPixels <= toolTipWidth) {
			setIsTooltipFit(false);
		} else {
			setIsTooltipFit(true);
		}
	};

	const animeCardRef = useRef<HTMLDivElement>(null);
	const toolTipRef = useRef<HTMLDivElement>(null);

	const [isTooltipFit, setIsTooltipFit] = useState(true);

	const isAnimeCardInView = useIsInViewport(animeCardRef);

	useEffect(() => {
		const queryEvent = new Event('queryNextPage');

		if (isAnimeCardInView) {
			window.addEventListener('resize', handleResize);
		} else {
			window.removeEventListener('resize', handleResize);
		}

		if (isAnimeCardInView && isLastItem) {
			document.dispatchEvent(queryEvent);
		}

		return () => window.removeEventListener('resize', handleResize);
	}, [isAnimeCardInView, isLastItem]);

	// run handleResize on initial render of anime card to check if toolTip overflows
	useEffect(() => {
		handleResize();
	}, []);

	return (
		<Link href={ `/media/${encodeURIComponent(id)}` }>
			<a className={ MediaDisplayStyles.animeCard }>
				<div ref={ animeCardRef }>
					<div>
						<Image src={ coverImageUrl } layout='responsive' height={300} width={200} style={{ borderRadius: '8px' }}/>
					</div>
					<p className={ MediaDisplayStyles.animeTitle }>{ title }</p>
				</div>
				<div className={ isTooltipFit ? MediaDisplayStyles.toolTipRight : MediaDisplayStyles.toolTipLeft } ref={ toolTipRef }>
					<span style={{ color: '#4f4f4f' }}>{ season } { seasonYear }</span>
					<p className={ MediaDisplayStyles.studio }>{ studio }</p>
					<p className={ MediaDisplayStyles.info }>{ getFormat(format) } { episodes && <span>&#8226; {episodes} episodes</span> }</p>
					<div className={ MediaDisplayStyles.genresContainer }>
						{
							genres.map((genre: string, index: number) =>
								<div className={ MediaDisplayStyles.genreItem } key={ index }>{ genre }</div>
							)
						}
					</div>
				</div>
			</a>
		</Link>
	)
}

export default AnimeCard