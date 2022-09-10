import { useState, useEffect, useRef, RefObject } from 'react';
import Image from 'next/image';
import { useCarousel } from '../hooks/useCarousel';
import { Anime } from '../interfaces/queryInterface';

import TrendingBarStyles from '../styles/TrendingBar.module.css'

type Props = {
	animeList: Anime[],
}

const TrendingBar = ({ animeList }: Props) => {

	const carouselContainerRef = useRef<HTMLDivElement>(null);
	
	const {activeIndex, styles, containerHeight} = useCarousel(animeList.length, carouselContainerRef);

	// hook for making media queries to change image size based on browser window width
	const useMedia = (queries: string[], heightList: string[], defaultHeight: string): string => {
		// array of media queries
		const mediaQueryList = queries.map((query: string) => window.matchMedia(query));

		// get the corresponding height of the matching query
		const getHeight = (): string => {
			// find index of first matching query if it exists
			const index = mediaQueryList.findIndex((mediaQuery: MediaQueryList) => mediaQuery.matches);

			// if no queries match, return default height
			return index === -1 ? defaultHeight : heightList[index];
		}
		
		const [height, setHeight] = useState(getHeight());

		useEffect(() => {
			const handler = () => setHeight(getHeight);

			mediaQueryList.forEach((mediaQuery: MediaQueryList) => mediaQuery.addEventListener('change', handler));

			return () => mediaQueryList.forEach((mediaQuery: MediaQueryList) => {
				mediaQuery.removeEventListener('change', handler)
			});
		}, []);

		return height;
	}

	const height = useMedia(
		[
			'only screen and (max-width: 600px)', 
			'only screen and (max-width: 800px)',
			'only screen and (max-width: 1000px)',
			'only screen and (max-width: 1200px)'
		],
		[
			'800', 
			'700',
			'600', 
			'500'
		],
		'400'
	);

	const parseDescription = (description: string): string => {
		let tempDoc = document.createElement('DIV');
		tempDoc.innerHTML = description;

		return tempDoc.textContent || tempDoc.innerText || '';
	};

	return (
			<div ref={carouselContainerRef} className={ TrendingBarStyles.carouselContainer }>
				<div className={ TrendingBarStyles.itemIndicatorContainer } style={{height: `${containerHeight}px`}}>
					{
						animeList.map((_, index: number) =>
							<div className={TrendingBarStyles.itemIndicator} style={{backgroundColor: activeIndex === index ? '#418D89' : 'white'}} key={index}></div>
						)
					}
				</div>
				<div className={TrendingBarStyles.carouselInner} style={styles}>
					<div className={ TrendingBarStyles.carouselItem}>
						<div className={TrendingBarStyles.carouselTextOverlay}>
							<div className={TrendingBarStyles.textContainer}>
								<h1>{animeList[animeList.length - 1].title.english}</h1>
								<p>{parseDescription(animeList[animeList.length - 1].description)}</p>
							</div>
						</div>
						<Image
							src={animeList[animeList.length - 1].bannerImage}
							height={height}
							width={1900}
							objectFit='cover'
							layout='responsive'
							style={{ borderRadius: '10px' }}
							draggable='false'
						/>
					</div>
					{
						animeList.map((anime: Anime, key: number) =>
							<div className={ TrendingBarStyles.carouselItem} key={key}>
								<div className={TrendingBarStyles.carouselTextOverlay}>
									<div className={TrendingBarStyles.textContainer}>
										<h1>{anime.title.english}</h1>
										<p>{parseDescription(anime.description)}</p>
									</div>
								</div>
								<Image
									src={anime.bannerImage}
									height={height}
									width={1900}
									objectFit='cover'
									layout='responsive'
									style={{ borderRadius: '10px' }}
									draggable='false'
								/>
							</div>
						)
					}
					<div className={ TrendingBarStyles.carouselItem}>
						<div className={TrendingBarStyles.carouselTextOverlay}>
							<div className={TrendingBarStyles.textContainer}>
								<h1>{animeList[0].title.english}</h1>
								<p>{parseDescription(animeList[0].description)}</p>
							</div>
						</div>
						<Image
							src={animeList[0].bannerImage}
							height={height}
							width={1900}
							objectFit='cover'
							layout='responsive'
							style={{ borderRadius: '10px' }}
							draggable='false'
						/>
					</div>
				</div>
			</div>
	)
}

export default TrendingBar