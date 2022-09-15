import type { NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { getMedia } from '../utils/aniListQueries'
import TrendingBar from '../components/TrendingBar'
import MediaDisplayBar from '../components/MediaDisplayBar';

type Props = {
	trendingList: AnimeList,
	popularList: AnimeList,
	popularCurrentSeasonList: AnimeList,
}

const Home: NextPage<Props> = ({ trendingList, popularList, popularCurrentSeasonList }) => {
	return (
		<>
			<Head>
				<title>NeetList</title>
			</Head>
			<TrendingBar 
				animeList={
					trendingList.media.map((anime: Anime) => anime)
						.filter((anime: Anime) => anime.bannerImage).slice(0, 8)
				 }
			/>
			<MediaDisplayBar
				title='POPULAR THIS SEASON'
				animeList={ popularCurrentSeasonList }
			/>
			<MediaDisplayBar
				title='All TIME POPULAR'
				animeList={ popularList }
			/>
		</>
	)
}

const getSeason = (month: number) => {

}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	const trendingList = await getMedia({ page: 1, perPage: 20, sort: 'TRENDING_DESC' });
	const popularList = await getMedia({ page: 1, perPage: 6, sort: 'POPULARITY_DESC' });
	const popularCurrentSeasonList = await getMedia({ page:1, perPage: 6, sort: 'POPULARITY_DESC', season: 'SUMMER'});

	return {
		props: {
			trendingList,
			popularList,
			popularCurrentSeasonList,
		}
	}
}

export default Home