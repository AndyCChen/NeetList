import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { NextPage } from "next"
import { AnimeList, Anime } from "../../interfaces/queryInterface"
import MediaDisplayGrid from "../../components/MediaDisplayGrid"

import { getMediaByName } from "../../utils/aniListQueries"

type Props = {
	searchString: string,
	mediaList: AnimeList,
}

const SearchPage: NextPage<Props> = ({ searchString, mediaList }) => {
	mediaList.media.forEach((value: Anime) => console.log(value.title.english ? value.title.english : value.title.romaji));

	return (
		<MediaDisplayGrid animeList={ mediaList }/>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	let searchString;

	if (context.params) {
		searchString = context.params.search_name;
	}

	const mediaList = await getMediaByName({ page: 1, perPage: 10, sort: 'POPULARITY_DESC', searchString: searchString as string});

	return {
		props: {
			searchString,
			mediaList,
		}
	}
}

export default SearchPage