export interface AnimeList {
   media: Anime[],
}

type Studio = {
   name: string
}

export interface Anime {
   id: string,
   bannerImage: string,
   description: string,
   title: {
      romaji: string,
      english: string,
      native: string,
   },
   coverImage: {
      large: string,
   },
   season: string,
   seasonYear: number,
   studios: {
      nodes: Studio[],
   },
   format: string,
   episodes: string,
   genres: string[],
}

export interface AnimeInfo {
   bannerImage: string,
   description: string,
   title: {
      romaji: string,
      english: string,
      native: string,
   },
   coverImage: {
      large: string,
   },
   season: string,
   seasonYear: number,
   studios: {
      nodes: Studio[],
   },
   format: string,
   episodes: string,
   genres: string[],
}