export interface Anime {
   media: Media[]
}

export interface Media {
   id: string,
   title: {
      romaji: string,
      english: string,
      native: string,
   }
}