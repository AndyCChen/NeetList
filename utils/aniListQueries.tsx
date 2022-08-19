import { AnimeList } from '../interfaces/queryInterface'

export const getTrendingMedia = async(): Promise<AnimeList> => {
	let query = `
		query ($page: Int, $perPage: Int) {
			Page (page: $page, perPage: $perPage) {
				media (sort: TRENDING_DESC, type: ANIME) {
					id,
					bannerImage,
					title {
						romaji,
						english,
						native,
					}
				}
			}
		}
	`;

	let variables = {
		page: 1,
		perPage: 8,
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