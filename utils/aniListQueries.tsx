import { AnimeList } from '../interfaces/queryInterface'

type Props = {
	page: number,
	perPage: number,
	sort: string,
	season?: string,
	year?: number,
};

/*
	page: value to determine which page of values to query as results are paginated
	perPage: value to specify how many items per page
	sort: how the results are sorted by, for example by trending or popularity
	season: filter results by seasons, default is undefined, if undefined the query is made without the season argument
	year: filter results by year, default is set to current year
*/
export const getMedia = async({page, perPage, sort, season, year = new Date().getFullYear()}: Props): Promise<AnimeList> => {
	let query: string;

	if (season !== undefined) {
		query = 
			`query ($page: Int, $perPage: Int, $sort: [MediaSort], $season: MediaSeason, $year: Int) {
				Page (page: $page, perPage: $perPage) {
					media (sort: $sort, type: ANIME, season: $season, seasonYear: $year) {
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
	} else {
		query = 
			`query ($page: Int, $perPage: Int, $sort: [MediaSort]) {
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
	}

	let variables = {
		page: page,
		perPage: perPage,
		sort: sort,
		season: season,
		year: year,
	};

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