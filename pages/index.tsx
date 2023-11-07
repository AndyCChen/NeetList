import type { NextPage, GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { getMedia } from '../utils/aniListQueries'
import TrendingBar from '../components/TrendingBar'
import MediaDisplayBar from '../components/MediaDisplayBar';
import { useEffect, useState } from 'react'
import { getSeason, getYear } from '../utils/dates'

type Props = {
	trendingList: AnimeList,
	popularList: AnimeList,
	popularCurrentSeasonList: AnimeList,
	upcomingNextSeasonList: AnimeList,
}

const Home: NextPage<Props> = ({ trendingList, popularList, popularCurrentSeasonList, upcomingNextSeasonList }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<>
			<Head>
				<title>NeetList</title>
			</Head>
			{
				!isLoading &&	
				<>
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
					<MediaDisplayBar
						title='UPCOMING NEXT SEASON'
						animeList={ upcomingNextSeasonList }
					/>
				</>
			}	
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	const trendingList = await getMedia({ page: 1, perPage: 20, sort: 'TRENDING_DESC' });
	const popularList = await getMedia({ page: 1, perPage: 6, sort: 'POPULARITY_DESC' });
	const popularCurrentSeasonList = await getMedia({ page:1, perPage: 6, sort: 'POPULARITY_DESC', season: getSeason({ }) });

	const season = getSeason({ getNextSeason: true});
	const year = getYear(season);

	const upcomingNextSeasonList = await getMedia({ page: 1, perPage: 6, sort: 'POPULARITY_DESC', season: season, year: year });

	return {
		props: {
			trendingList,
			popularList,
			popularCurrentSeasonList,
			upcomingNextSeasonList,
		}
	}
}

export default Home