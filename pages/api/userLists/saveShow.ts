import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from 'formidable';
import { Database } from "../../../interfaces/supabase";
import {JSONResponse, AnimeData } from '../../../interfaces/userListTypes'

export const config = {
   api: {
      bodyParser: false
   }
}

type formData = {
   fields: {
      showStatus: string[],
      score: string[],
      startDate: string[],
      endDate: string[],
      episodeProgress: string[],
   }
}

export default async function POST(req: NextApiRequest, res: NextApiResponse<JSONResponse>) {
   const supabase = createPagesServerClient<Database>({ req, res });

   const form = await new Promise((resolve, reject) => {
      const form = new Formidable();
      
      form.parse(req, (err, fields, files) => {
         if (err) {
            reject({ err });
         } else {
            resolve({ err, fields, files })
         }
      });
   });

   const {
      data: { user }
   } = await supabase.auth.getUser();

   const id = req.query.id as string;
   const category = (form as formData).fields.showStatus[0];
   const score = (form as formData).fields.score[0] as unknown as number;
   const start_date = (form as formData).fields.startDate[0];
   const finish_date = (form as formData).fields.endDate[0];
   const episode_progress = (form as formData).fields.episodeProgress[0] as unknown as number;


   const { data, error } = await supabase
      .from('shows')
      .upsert(
         {
            user_id: user?.id,
            anime_id: id,
            category: category,
            score: score,
            start_date: start_date ? start_date : null,
            finish_date: finish_date ? finish_date : null,
            episode_progress: episode_progress,
         },
         {
            onConflict: 'user_id, anime_id'
         }
      )
      .select();
   
   res.status(200).json({
      data: {
         Anime: data?.[0] as AnimeData
      },
      error
   })
}