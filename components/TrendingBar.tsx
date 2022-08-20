import { useState, useEffect, useRef, RefObject } from 'react';
import Image from 'next/image';

import TrendingBarStyles from '../styles/TrendingBar.module.css'

type Props = {
	imageUrls: string[],
}

const TrendingBar = ({ imageUrls }: Props) => {

	

	

	// track x position of cursor relative to initail point that is clicked on
	const _trackMousePosition = (ref: RefObject<HTMLDivElement>) => {
		// bool to track if the mouse held down or not
		let isDown = false;

		// x position of cursor when user clicks down
		let originX: number;

		useEffect(() => {
			// when mouse is held done update origin, and add mousemove event listener
			const handleMouseDown = (e: MouseEvent) => {
				isDown = true;
				originX = e.clientX
				document.addEventListener('mousemove', handleMouseMove);	
				document.addEventListener('mouseup', handleMouseUp);	
			}

			// when mouse is released, remove mousemove event listener
			const handleMouseUp = (e: MouseEvent) => {
				if (isDown) {
					document.removeEventListener('mousemove', handleMouseMove);
					document.removeEventListener('mouseup', handleMouseUp);
					isDown = false;
				}
			}

			const handleMouseMove = (e: MouseEvent) => {
				console.log(e.clientX - originX);
			}

			ref.current?.addEventListener('mousedown', handleMouseDown);
			
			return () => {
				ref.current?.removeEventListener('mousedown', handleMouseDown);
			}
		}, []);
	}

	const trendingBarRef = useRef<HTMLDivElement>(null);

	_trackMousePosition(trendingBarRef);

	// hook for making media queries
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
			'1000', 
			'700',
			'600', 
			'500'
		],
		'400'
	);

	return (
		<div ref={trendingBarRef} className={ TrendingBarStyles.trendingBarContainer }>
			<Image
				className={ TrendingBarStyles.image } 
				src={imageUrls[0]} 
				height={height} 
				width={1900} 
				layout='responsive' 
				objectFit='cover' 
				objectPosition='top right'
				draggable= 'false'
			/>
		</div>
	)
}

export default TrendingBar