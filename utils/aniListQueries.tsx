import { AnimeList, AnimeInfo } from '../interfaces/queryInterface'

type getMediaProps = {
	page: number,
	perPage: number,
	sort: string,
	season?: string,
	year?: number,
	isAdult?: boolean
};

/**
 * @page value to determine which page of values to query as results are paginated
 * @perPage value to specify how many items per page
 * @sort how the results are sorted by, for example by trending or popularity
 * @season filter results by seasons, default is undefined, if undefined the query is made without the season argument
 * @year filter results by year, default is set to current year
 * */ 
export const getMedia = async ({ page, perPage, sort, season, year = new Date().getFullYear(), isAdult = false }: getMediaProps): Promise<AnimeList> => {
	let query: string;

	if (season !== undefined) {
		query = 
			`query ($page: Int, $perPage: Int, $sort: [MediaSort], $season: MediaSeason, $year: Int, $isAdult: Boolean) {
				Page (page: $page, perPage: $perPage) {
					media (sort: $sort, type: ANIME, season: $season, seasonYear: $year, isAdult: $isAdult) {
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
						},
						season,
						seasonYear,
						studios (isMain: true) {
							nodes {
								name
							}
						},
						format,
						episodes,
						genres,
					}
				}
			}`;
	} else {
		query = 
			`query ($page: Int, $perPage: Int, $sort: [MediaSort], $isAdult: Boolean) {
				Page (page: $page, perPage: $perPage) {
					media (sort: $sort, type: ANIME, isAdult: $isAdult) {
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
						},
						season,
						seasonYear,
						studios (isMain: true) {
							nodes {
								name
							}
						},
						format,
						episodes,
						genres,
					}
				}
			}`;
	}

	const variables = {
		page: page,
		perPage: perPage,
		sort: sort,
		season: season,
		year: year,
		isAdult: isAdult
	};

	const url = 'https://graphql.anilist.co';
	const options = {
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
};

type getMediaByIDProps = {
	id: number
};

export const getMediaByID = async ({ id }: getMediaByIDProps): Promise<AnimeInfo> => {
	const query = 
		`query ($id: Int) {
			Media (id: $id, type: ANIME) {
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
					medium,
				},
				season,
				seasonYear,
				studios (isMain: true) {
					nodes {
						name
					}
				},
				format,
				episodes,
				genres,
				startDate {
					year,
					month,
					day,
				},
				endDate {
					year,
					month,
					day,
				},
				status,
			}
		}`;

	const variables = {
		id: id
	};

	const url = 'https://graphql.anilist.co';
	const options = {
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
	const media = await res.json();

	return res.ok ? media.data.Media : Promise.reject(media);
}

type getMediaByNameProps = {
	page: number,
	perPage: number,
	sort: string,
	searchString?: string,
	isAdult?: boolean
}

/**
 * fetches a list of shows based on name or sort category
 * @param searchString If not provided, query is executed based on sort parameter 
 */
export const getMediaByName = async ({ page, perPage, sort, searchString, isAdult = false }: getMediaByNameProps): Promise<AnimeList> => {
	let query: string;

	if (searchString) {
		query = 
			`query ($page: Int, $perPage: Int, $sort: [MediaSort], $search: String, $isAdult: Boolean) {
				Page (page: $page, perPage: $perPage) {
					media (sort: $sort, search: $search, type: ANIME, isAdult: $isAdult) {
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
						},
						season,
						seasonYear,
						studios (isMain: true) {
							nodes {
								name
							}
						},
						format,
						episodes,
						genres,
					}
				}
			}`;
	} else {
		query =
			`query ($page: Int, $perPage: Int, $sort: [MediaSort], $isAdult: Boolean) {
				Page (page: $page, perPage: $perPage) {
					media (sort: $sort, type: ANIME, isAdult: $isAdult) {
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
						},
						season,
						seasonYear,
						studios (isMain: true) {
							nodes {
								name
							}
						},
						format,
						episodes,
						genres,
					}
				}
			}`;
	}	

		const variables = {
			page: page,
			perPage: perPage,
			sort: sort,
			search: searchString,
			isAdult: isAdult
		};
	
		const url = 'https://graphql.anilist.co';
		const options = {
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
		const mediaList = await res.json();
	
		return res.ok ? mediaList.data.Page : Promise.reject(mediaList);
}