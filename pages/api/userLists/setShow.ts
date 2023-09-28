import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from '../../../interfaces/supabase'
import {JSONResponse, AnimeData } from '../../../interfaces/userListTypes'

export default async function POST(req: NextApiRequest, res: NextApiResponse<JSONResponse>) {
   const supabase = createPagesServerClient<Database>({ req, res });
   const id = req.query.id as string;
   const status = req.query.status as string;

   const {
      data: { user }
   } = await supabase.auth.getUser();

   const { data, error } = await supabase
      .from('shows')
      .upsert(
         { user_id: user?.id, anime_id: id, category: status },
         { onConflict: 'user_id, anime_id' }
      )
      .select();

   res.status(200).json({
      data: {
         Anime: data?.[0] as AnimeData
      },
      error: error
   }) 
}