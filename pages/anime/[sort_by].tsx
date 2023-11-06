import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getMediaByName, getMedia } from '../../utils/aniListQueries'
import { Anime, AnimeList } from "../../interfaces/queryInterface"
import { useState, useEffect, useRef } from "react"
import React from "react"
import AnimeCard from "../../components/AnimeCard"
import MediaDisplayGrid from "../../components/MediaDisplayGrid"

import GridStyles from '../../styles/SearchPage.module.css'

type DisplayBySoryProps = {
	sort_by: string,
	mediaList: AnimeList;
}

const DisplayBySort = ({ sort_by, mediaList }: DisplayBySoryProps) => {
	const isDoneQuerying = useRef(false);
	const pageNumber = useRef(1);
	console.log(pageNumber.current)
	const [pageResults, setPageResults] = useState<Anime[]>(mediaList.media);

	const queryNextPageResults = async () => {
		pageNumber.current = pageNumber.current + 1;
		const nextPageQuery = await getMediaByName({ page: pageNumber.current, perPage: 20, sort: 'POPULARITY_DESC' })

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

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	let sort_by: string;
	let mediaList: AnimeList | null;

	if (!context.params) {
		return {
			notFound: true,
		}
	}

	if (context.params.sort_by == 'this-season') {
		sort_by = context.params.sort_by
		mediaList = null;
	}
	else if (context.params.sort_by == 'popular') {
		sort_by = context.params.sort_by
		mediaList = await getMediaByName({ page: 1, perPage: 20, sort: 'POPULARITY_DESC' });
	}
	else if (context.params.sort_by == 'next-season') {
		sort_by = context.params.sort_by;
		mediaList = null;
	}
	else return { notFound: true }
	


	

	return {
		props: {
			sort_by: sort_by,
			mediaList: mediaList,
		}
	}
}

export default DisplayBySort