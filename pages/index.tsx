import type { NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { getTrendingMedia } from '../utils/aniListQueries'
import TrendingBar from '../components/TrendingBar'

type Props = {
	trendingList: AnimeList;
}

const Home: NextPage<Props> = ({ trendingList }) => {
	return (
		<>
			<Head>
				<title>NeetList</title>
			</Head>
			<TrendingBar 
				imageUrls={
					trendingList.media.map((anime: Anime) => anime.bannerImage)
						.filter((imageUrl: string) => imageUrl)
				 }
			/>
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