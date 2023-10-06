import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from 'formidable';
import { Database } from "../../../interfaces/supabase";
import {JSONResponse, AnimeData } from '../../../interfaces/userListTypes'

interface ParsedFormData {
   fields: {
      showStatus: string[],
      score: string[],
      startDate: string[],
      endDate: string[],
      episodeProgress: string[],
   }
}

interface FormData {
   showStatus: string,
   score: number,
   startDate: string | null,
   endDate: string | null,
   episodeProgress: number,
}

interface SaveShowQueryParams {
   id: string,
}

const isSaveShowQueryParams = (queryParams: any): boolean => {
   return (queryParams as SaveShowQueryParams).id !== undefined;
}

const isParsedFormData = (formData: any): boolean => {
   return (formData as ParsedFormData).fields.showStatus[0] !== undefined &&
   (formData as ParsedFormData).fields.score[0] as unknown as number !== undefined &&
   (formData as ParsedFormData).fields.startDate[0] !== undefined &&
   (formData as ParsedFormData).fields.endDate[0] !== undefined &&
   (formData as ParsedFormData).fields.episodeProgress[0] as unknown as number !== undefined
}

export default async function POST(req: NextApiRequest, res: NextApiResponse<JSONResponse>) {
   const supabase = createPagesServerClient<Database>({ req, res });
   /* if (!isSaveShowQueryParams(req.query)) {
      res.status(404).json({
         data: {
            Anime: null,
         },
         error: { message: 'Bad request url!' },
      })

      return;
   } */

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

   if (!isParsedFormData(form)) {
      res.status(404).json({
         data: {
            Anime: null
         },
         error: { message: 'An error occured while processing the form!' },
      })

      return;
   }

   const { fields: parsedForm } = form as ParsedFormData;
   
   const formData: FormData = {
      showStatus: parsedForm.showStatus.join(''),
      score: parsedForm.score.join('') as unknown as number,
      startDate: parsedForm.startDate.join(''),
      endDate: parsedForm.endDate.join(''),
      episodeProgress: parsedForm.episodeProgress.join('') as unknown as number,
   }

   const {
      data: { user }
   } = await supabase.auth.getUser();

   if (!user) {
      res.status(404).json({
         data: {
            Anime: null
         },
         error: { message: 'User not authenticated!' },
      })

      return;
   }
   console.log(formData)
   const { data, error } = await supabase
      .from('shows')
      .upsert(
         {
            user_id: user.id,
            anime_id: req.query.id as string,
            category: formData.showStatus,
            score: formData.score,
            start_date: formData.startDate ? formData.startDate : null,
            finish_date: formData.endDate ? formData.endDate : null,
            episode_progress: formData.episodeProgress,
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
      error: error
   })
}

export const config = {
   api: {
      bodyParser: false
   }
}