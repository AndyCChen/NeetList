import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { NextPage } from "next"
import { AnimeList } from "../../interfaces/queryInterface"
import { getMediaByName } from "../../utils/aniListQueries"
import { useEffect, useState } from "react"
import SearchPageBody from "../../components/searchPage/SearchPageBody"

type Props = {
	searchString: string,
	mediaList: AnimeList,
}

const SearchPage: NextPage<Props> = ({ searchString, mediaList }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);
	
	if (!isLoading) {
		return (
			<SearchPageBody searchString={ searchString } mediaList={ mediaList }/>
		)
	} else {
		return (
			<div></div>
		)
	}
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