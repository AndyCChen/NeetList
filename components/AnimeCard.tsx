//import Image from 'next/image'
import Image from 'next/legacy/image'
import Link from 'next/link';
import { useEffect, useRef, useState, RefObject } from 'react';

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

		const observer = useRef<IntersectionObserver>();

		useEffect(() => {
			observer.current = new IntersectionObserver(([entry]) => setIsIntersectingViewport(entry.isIntersecting));
		}, []);

		useEffect(() => {
			observer.current?.observe(ref.current as Element);

			return () => {
				observer.current?.disconnect();
			}
		}, [ref, observer]);

		return isIntersectingViewport;
	};

	const animeCardRef = useRef<HTMLDivElement>(null);
	const toolTipRef = useRef<HTMLDivElement>(null);

	const [isTooltipFit, setIsTooltipFit] = useState(true);

	const isAnimeCardInView = useIsInViewport(animeCardRef);

	const handleResize = () => {
		console.log('resize')
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

	useEffect(() => {
		if (isAnimeCardInView) {
			window.addEventListener('resize', handleResize);
		} else {
			window.removeEventListener('resize', handleResize);
		}

		if (isAnimeCardInView && isLastItem) {
			const queryEvent = new Event('queryNextPage');
			document.dispatchEvent(queryEvent);
		}

		return () => window.removeEventListener('resize', handleResize);
	}, [isAnimeCardInView, isLastItem]);

	const [isImageLoaded, setLoaded] = useState(false);

	return (
		<Link className={ MediaDisplayStyles.animeCard } href={ `/media/${encodeURIComponent(id)}` }>
			<div ref={ animeCardRef }>
				<div className={ MediaDisplayStyles.animeCardInner } style={{ transform: `scale(${isImageLoaded ? '1' : '0'})`}}>
					<div>
						<Image
							alt={ 'Thumbnail' }
							src={ coverImageUrl }
							layout='responsive'
							height={300}
							width={200}
							style={{ borderRadius: '8px' }}
							onLoad={() => { setLoaded(true); handleResize(); }}
						/>
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
			</div>
		</Link>
	)
}

export default AnimeCard