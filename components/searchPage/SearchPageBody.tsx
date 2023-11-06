import React, { useState, useEffect } from "react";
import { AnimeList, Anime } from "../../interfaces/queryInterface";
import { getMediaByName } from "../../utils/aniListQueries";
import AnimeCard from "../AnimeCard";
import MediaDisplayGrid from "../MediaDisplayGrid";

import GridStyles from '../../styles/SearchPage.module.css'


type searchPageBodyProps = {
	searchString: string,
	mediaList: AnimeList,
}

const SearchPageBody = ({ searchString, mediaList }: searchPageBodyProps) => {

	let isDoneQuerying = false;
	let pageNumber = 1;

	const [pageResults, setPageResults] = useState<Anime[]>(mediaList.media);

	const queryNextPageResults = async () => {

		pageNumber++;
		const nextPageQuery = await getMediaByName({ page: pageNumber, perPage: 20, sort: 'POPULARITY_DESC', searchString: searchString })

		// return to avoid unnecessary state update if query returns no results
		if (nextPageQuery.media.length == 0) {
			isDoneQuerying = true;
			return;
		}
	
		setPageResults((currentPageResults) => [...currentPageResults, ...nextPageQuery.media]);
	}

	// update page results and event listeners when mediaList changes
	useEffect(() => {
		setPageResults(mediaList.media);

		const queryNextPageHandler = () => {
			!isDoneQuerying && queryNextPageResults();
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

export default SearchPageBody