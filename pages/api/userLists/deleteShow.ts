import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from '../../../interfaces/supabase'
import {AnimeData, JSONResponse } from '../../../interfaces/userListTypes'

export default async function POST(req: NextApiRequest, res: NextApiResponse<JSONResponse>) {
   const supabase = createPagesServerClient<Database>({ req, res });
   const id = req.query.id?.toString();

   const {
      data: { user }
   } = await supabase.auth.getUser();

   const { data, error } = await supabase
      .from('shows')
      .delete()
      .match({
         'user_id': user?.id,
         'anime_id': id,
      })
      .select();

   if (error) {
      res.status(400).json({
         data: {
            Anime: null
         },
         error
      })
   }

   res.status(200).json({
      data: {
         Anime: data?.[0] as AnimeData
      },
      error
   })
}