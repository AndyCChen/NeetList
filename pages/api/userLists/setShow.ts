import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from '../../../interfaces/supabase'
import {JSONResponse, AnimeData } from '../../../interfaces/userListTypes'

interface RequestBody {
   id: string,
   status: string,
   imageURL: string,
   title: string,
}

const isRequestBody = (requestBody: any): boolean => {
   return (requestBody as RequestBody).id !== undefined 
      && (requestBody as RequestBody).status !== undefined 
      && (requestBody as RequestBody).imageURL !== undefined 
      && (requestBody as RequestBody).title !== undefined;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse<JSONResponse>) {
   const supabase = createPagesServerClient<Database>({ req, res });

   if (!isRequestBody(req.body)) {
      res.status(404).json({
         data: {
            Anime: null
         },
         error: {
            message: 'Invalid request body!',
         }
      })
   }

   const body = req.body as RequestBody;

   const {
      data: { user }
   } = await supabase.auth.getUser();

   if (!user) {
      res.status(404).json({
         data: {
            Anime: null
         },
         error: {
            message: 'User not authenticated!',
         }
      })

      return;
   }

   const { data, error } = await supabase
      .from('shows')
      .upsert(
         { user_id: user.id, anime_id: body.id, category: body.status, imageurl: body.imageURL, title: body.title },
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