import { PostgrestError } from "@supabase/supabase-js"

export type AnimeData = {
   anime_id: string
   category: string
   episode_progress: number
   finish_date: string | null
   id: number
   score: number
   start_date: string | null
   user_id: string,
   imageurl: string | null,
   title: string | null
}

export type JSONResponse = {
   data: {
      Anime: AnimeData | null
   },
   error: PostgrestError | null | { message: string }
}