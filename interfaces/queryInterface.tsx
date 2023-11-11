export interface AnimeList {
   media: Anime[],
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
      nodes: Array<{name: string}>,
   },
   format: string,
   episodes: string,
   genres: string[],
}

export interface FuzzyDate {
   year: number,
   month: number,
   day: number
}

export interface AnimeInfo {
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
      medium: string,
   },
   season: string,
   seasonYear: number,
   studios: {
      nodes: Array<{ name: string }>,
   },
   format: string,
   episodes: string,
   genres: string[],
   startDate: FuzzyDate,
   endDate: FuzzyDate,
   status: string,
   characters: {
      edges: {
         role: string,
         node: {
            image: {
               large: string
            },
            name: {
               full: string
            }
         }
      } []
   }
}

export interface AnimeItem {
   id: string,
   category: string,
}

export interface AnimeListCategory {
   category: string,
   animeItemList: AnimeItem[],
}