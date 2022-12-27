import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { NextPage } from "next"
import { AnimeList, Anime } from "../../interfaces/queryInterface"
import MediaDisplayGrid from "../../components/MediaDisplayGrid"
import { getMediaByName } from "../../utils/aniListQueries"

import GridStyles from '../../styles/SearchPage.module.css'
import { useEffect, useState } from "react"

type Props = {
	searchString: string,
	mediaList: AnimeList,
}

const SearchPage: NextPage<Props> = ({ searchString, mediaList }) => {

	let pageNumber: number = 1;
	let isDoneQuerying = false;

	const [pageResults, setPageResults] = useState<Anime[]>(mediaList.media);
	
	useEffect(() => {
		// ensure pageResults state is not stale
		setPageResults(mediaList.media);

		// detect when user scrolls to the bottom of the page
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [mediaList]);

	const handleScroll = () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			!isDoneQuerying && queryNextPageResults();
		}
	}

	const queryNextPageResults = async () => {

		// increment current page number to query the next page
		pageNumber++;
	  	const nextPageQuery = await getMediaByName({ page: pageNumber, perPage: 20, sort: 'POPULARITY_DESC', searchString: searchString })

		// return to avoid unnecessary state update if query returns no results
		if (nextPageQuery.media.length == 0) {
			isDoneQuerying = true;
			return;
		}

		setPageResults((currentPageResults) => [...currentPageResults, ...nextPageQuery.media]);
	}

	return (
		<div className={ GridStyles.pageContent }>
			{
				pageResults.length != 0 ? <MediaDisplayGrid animeList={ pageResults }/> : <div>No Results</div>
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

	return {
		props: {
			searchString,
			mediaList
		}
	}
}

export default SearchPage