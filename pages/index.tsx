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
	return (
		<>
			<Head>
				<title>NeetList</title>
			</Head>
			<TrendingBar imageUrls={ trendingList.media.map((anime: Anime) => anime.bannerImage) }/>
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
