import { AnimeList } from '../interfaces/queryInterface'

type Props = {
	page: number,
	perPage: number,
	sort: string,
};

export const getMedia = async({page, perPage, sort}: Props): Promise<AnimeList> => {
	let query = `
		query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
			Page (page: $page, perPage: $perPage) {
				media (sort: $sort, type: ANIME) {
					id,
					bannerImage,
					description (asHtml: false),
					title {
						romaji,
						english,
						native,
					},
					coverImage {
						large,
					}
				}
			}
		}`;

	let variables = {
		page: page,
		perPage: perPage,
		sort: sort,
	}

	let url = 'https://graphql.anilist.co';
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			query: query,
			variables: variables,
		})
	};

	const res = await fetch(url, options);
	const trendingList = await res.json();

	return res.ok ? trendingList.data.Page : Promise.reject(trendingList);
}