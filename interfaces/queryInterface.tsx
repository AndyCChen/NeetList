export interface AnimeList {
   media: Anime[]
}

export interface Anime {
   id: string,
   bannerImage: string,
   description: string,
   title: {
      romaji: string,
      english: string,
      native: string,
   }
}