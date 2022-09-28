import { useRef } from 'react';
import Image from 'next/image';
import { useCarousel } from '../hooks/useCarousel';
import { Anime } from '../interfaces/queryInterface';
import { useMediaQuery } from '../hooks/useMediaQuery';

import TrendingBarStyles from '../styles/TrendingBar.module.css'

type Props = {
	animeList: Anime[],
}

const TrendingBar = ({ animeList }: Props) => {

	const carouselContainerRef = useRef<HTMLDivElement>(null);
	
	const {activeIndex, styles} = useCarousel(animeList.length, carouselContainerRef);

	const height = useMediaQuery(
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
				<div className={ TrendingBarStyles.itemIndicatorContainer }>
					{
						animeList.map((_, index: number) =>
							<div className={ TrendingBarStyles.itemIndicator } style={{backgroundColor: activeIndex === index ? '#418D89' : 'white'}} key={index}></div>
						)
					}
				</div>
				<div className={ TrendingBarStyles.carouselInner } style={styles}>
					<div className={ TrendingBarStyles.carouselItem }>
						<div className={ TrendingBarStyles.carouselTextOverlay }>
							<div className={ TrendingBarStyles.textContainer }>
								<h1>{ animeList[animeList.length - 1].title.english }</h1>
								<p>{ parseDescription(animeList[animeList.length - 1].description) }</p>
							</div>
						</div>
						<Image
							src={ animeList[animeList.length - 1].bannerImage }
							height={ height }
							width={1900}
							objectFit='cover'
							layout='responsive'
							draggable='false'
						/>
					</div>
					{
						animeList.map((anime: Anime, key: number) =>
							<div className={ TrendingBarStyles.carouselItem} key={key}>
								<div className={ TrendingBarStyles.carouselTextOverlay }>
									<div className={ TrendingBarStyles.textContainer }>
										<h1>{ anime.title.english }</h1>
										<p>{ parseDescription(anime.description) }</p>
									</div>
								</div>
								<Image
									src={ anime.bannerImage }
									height={ height }
									width={ 1900 }
									objectFit='cover'
									layout='responsive'
									draggable='false'
								/>
							</div>
						)
					}
					<div className={ TrendingBarStyles.carouselItem}>
						<div className={ TrendingBarStyles.carouselTextOverlay }>
							<div className={ TrendingBarStyles.textContainer }>
								<h1>{ animeList[0].title.english }</h1>
								<p>{ parseDescription(animeList[0].description) }</p>
							</div>
						</div>
						<Image
							src={ animeList[0].bannerImage }
							height={ height }
							width={ 1900 }
							objectFit='cover'
							layout='responsive'
							draggable='false'
						/>
					</div>
				</div>
			</div>
	)
}

export default TrendingBar