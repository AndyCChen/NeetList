import type { NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { getTrendingMedia } from '../utils/aniListQueries'
import Image from 'next/image'
import TrendingBar from '../components/TrendingBar'
import { useEffect, useState } from 'react'

import TrendingBarStyles from '../styles/TrendingBar.module.css'

type Props = {
	trendingList: AnimeList;
}

const Home: NextPage<Props> = ({ trendingList }) => {

	// hook for making media queries
	const useMedia = (queries: string[], widths: string[], defaultWidth: string): string => {
		// array of media queries
		const mediaQueryList = queries.map((query: string) => window.matchMedia(query));

		// get the corresponding width of the matching query
		const getWidth = (): string => {
			// find index of first matching query if it exists
			const index = mediaQueryList.findIndex((mediaQuery: MediaQueryList) => mediaQuery.matches);

			// if no queries match, return default width
			return index === -1 ? defaultWidth : widths[index];
		}
		
		const [width, setWidth] = useState(getWidth());

		useEffect(() => {
			const handler = () => setWidth(getWidth);

			mediaQueryList.forEach((mediaQuery: MediaQueryList) => mediaQuery.addEventListener('change', handler));

			return () => mediaQueryList.forEach((mediaQuery: MediaQueryList) => {
				mediaQuery.removeEventListener('change', handler)
			});
		}, []);

		return width;
	}

	const width = useMedia(
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
		<>
			<Head>
				<title>NeetList</title>
			</Head>

			<div className={ TrendingBarStyles.trendingBarContainer }>
				<Image 
					className={ TrendingBarStyles.image } 
					src={trendingList.media[1].bannerImage} 
					height={width} 
					width={1900} 
					layout='responsive' 
					objectFit='cover' 
					objectPosition='top right'
				/>
			</div>

		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

	const trendingList = await getTrendingMedia();

	return {
		props: {
			trendingList
		}
	}
}

export default Home
