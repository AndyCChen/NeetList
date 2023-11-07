import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getMediaByName, getMedia } from '../../utils/aniListQueries'
import { Anime, AnimeList } from "../../interfaces/queryInterface"
import { useState, useEffect, useRef } from "react"
import React from "react"
import AnimeCard from "../../components/AnimeCard"
import MediaDisplayGrid from "../../components/MediaDisplayGrid"
import { getSeason, getYear } from '../../utils/dates'

import GridStyles from '../../styles/SearchPage.module.css'

type DisplayBySoryProps = {
	category: string,
	mediaList: AnimeList;
	routeParam: string,
}

const DisplayBySort = ({ category, mediaList, routeParam }: DisplayBySoryProps) => {
	const isDoneQuerying = useRef(false);
	const pageNumber = useRef(1);
	const [pageResults, setPageResults] = useState<Anime[]>(mediaList.media);

	const queryNextPageResults = async () => {
		pageNumber.current = pageNumber.current + 1;
		let nextPageQuery: AnimeList;
		
		if (routeParam == 'this-season')
			nextPageQuery = await getMedia({ page:pageNumber.current, perPage: 20, sort: 'POPULARITY_DESC', season: getSeason({ }) });
		else if (routeParam == 'popular')
			nextPageQuery = await getMediaByName({ page: pageNumber.current, perPage: 20, sort: 'POPULARITY_DESC' });
		else {
			const season = getSeason({ getNextSeason: true});
			const year = getYear(season);
			nextPageQuery = await getMedia({ page: pageNumber.current, perPage: 20, sort: 'POPULARITY_DESC', season: season, year: year });
		}

		// return to avoid unnecessary state update if query returns no results
		if (nextPageQuery.media.length == 0) {
			isDoneQuerying.current = true;
			return;
		}
	
		setPageResults((currentPageResults) => [...currentPageResults, ...nextPageQuery.media]);
	}

	// update page results and event listeners when mediaList changes
	useEffect(() => {
		setPageResults(mediaList.media);

		const queryNextPageHandler = () => {
			!isDoneQuerying.current && queryNextPageResults();
		}

		document.addEventListener('queryNextPage', queryNextPageHandler);

		return () => document.removeEventListener('queryNextPage', queryNextPageHandler);
	}, [mediaList]);

	return (
		<div className={ GridStyles.pageContent }>
			<h1 className={ GridStyles.header }>{ category }</h1>
			<MediaDisplayGrid animeList={ pageResults }>
			{
				pageResults.map((anime: Anime, index: number) =>
					<React.Fragment key={ anime.id }>
						<AnimeCard
							id={ anime.id }
							coverImageUrl={ anime.coverImage.large }
							title={ anime.title.english ? anime.title.english : anime.title.romaji }
							season={ anime.season ? anime.season : 'TBA' }
							seasonYear={ anime.seasonYear && anime.seasonYear }
							studio={ anime.studios.nodes.length != 0 ? anime.studios.nodes[0].name : ''}
							format={ anime.format }
							episodes={ anime.episodes }
							genres={ anime.genres }
							isLastItem={ index == pageResults.length - 1 }
						/>
					</React.Fragment>
				)
			}
			</MediaDisplayGrid>
		
		</div>
	)
}

const normalizeString = (text: string): string => {
	return text.charAt(0).toLocaleUpperCase() + text.slice(1).toLocaleLowerCase();
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	let category: string;
	let mediaList: AnimeList | null;

	if (!context.params) {
		return {
			notFound: true,
		}
	}

	if (context.params.sort_by == 'this-season') {
		const season = getSeason({ });
		const year = getYear(season);
		category = `${ normalizeString(season) } ${year}`;
		mediaList = await getMedia({ page:1, perPage: 20, sort: 'POPULARITY_DESC', season: getSeason({ }) });
	}
	else if (context.params.sort_by == 'popular') {
		category = 'All Time Popular';
		mediaList = await getMediaByName({ page: 1, perPage: 20, sort: 'POPULARITY_DESC' });
	}
	else if (context.params.sort_by == 'next-season') {
		const season = getSeason({ getNextSeason: true});
		const year = getYear(season);
		category = `Next Season - Airing ${ normalizeString(season) } ${year}`;
		mediaList = await getMedia({ page: 1, perPage: 20, sort: 'POPULARITY_DESC', season: season, year: year });
	}
	else return { notFound: true }
	
	return {
		props: {
			category: category,
			mediaList: mediaList,
			routeParam: context.params.sort_by,
		}
	}
}

export default DisplayBySort