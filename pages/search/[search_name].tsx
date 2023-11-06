import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { NextPage } from "next"
import { Anime, AnimeList } from "../../interfaces/queryInterface"
import { getMediaByName } from "../../utils/aniListQueries"
import { useEffect, useRef, useState } from "react"
import React from "react"
import AnimeCard from "../../components/AnimeCard"
import MediaDisplayGrid from "../../components/MediaDisplayGrid"

import GridStyles from '../../styles/SearchPage.module.css'

type Props = {
	searchString: string,
	mediaList: AnimeList,
}

const SearchPage: NextPage<Props> = ({ searchString, mediaList }) => {
	const isDoneQuerying = useRef(false);
	const pageNumber = useRef(1);

	const [pageResults, setPageResults] = useState<Anime[]>(mediaList.media);

	const queryNextPageResults = async () => {
		pageNumber.current = pageNumber.current + 1;
		const nextPageQuery = await getMediaByName({ page: pageNumber.current, perPage: 20, sort: 'POPULARITY_DESC', searchString: searchString })

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
		{
			pageResults.length != 0 ? 
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
				</MediaDisplayGrid> : 
				<div>No Results</div>
		}
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	let searchString;

	if (context.params) {
		searchString = context.params.search_name;
	}

	const mediaList = await getMediaByName({ page: 1, perPage: 20, sort: 'POPULARITY_DESC', searchString: searchString as string});

	// return error 404 if request is failed
   if (!mediaList) {
      return {
         notFound: true,
      }
   }

	return {
		props: {
			searchString,
			mediaList
		}
	}
}

export default SearchPage