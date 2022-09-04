import { useState, useEffect, useRef, RefObject } from 'react';
import Image from 'next/image';
import { useMousePosition } from '../hooks/useMousePositionX';
import { useCarousel } from '../hooks/useCarousel';

import TrendingBarStyles from '../styles/TrendingBar.module.css'

type Props = {
	imageUrls: string[],
}

const TrendingBar = ({ imageUrls }: Props) => {

	const carouselContainerRef = useRef<HTMLDivElement>(null);

	useMousePosition(carouselContainerRef);
	
	const {activeIndex, styles} = useCarousel(imageUrls.length);

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

	return (
			<div ref={carouselContainerRef} className={ TrendingBarStyles.carouselContainer }>
				<div className={ TrendingBarStyles.carouselItem} style={styles}>
					<Image
						src={imageUrls[imageUrls.length - 1]}
						height={height}
						width={1900}
						objectFit='cover'
						layout='responsive'
						style={{ borderRadius: '10px' }}
						draggable='false'
					/>
				</div>
				{
					imageUrls.map((url: string, key: number) =>
						<div className={ TrendingBarStyles.carouselItem} key={key} style={styles}>
							<Image
								src={url}
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
				<div className={ TrendingBarStyles.carouselItem} style={styles}>
					<Image
						src={imageUrls[0]}
						height={height}
						width={1900}
						objectFit='cover'
						layout='responsive'
						style={{ borderRadius: '10px' }}
						draggable='false'
					/>
				</div>
			</div>
	)
}

export default TrendingBar