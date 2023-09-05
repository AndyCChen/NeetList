import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from 'formidable';

type formData = {
   fields: {
      email: string[],
      password: string[],
      username: string[],
   }
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
   const supabase = createPagesServerClient({ req, res });
   const requestHeader = req.headers.host;
   
   if (requestHeader === undefined) {
      res.status(400).send({
         message: 'request header is undefined.'
      })
   }
   
   const data = await new Promise((resolve, reject) => {
      const form = new Formidable();
      
      form.parse(req, (err, fields, files) => {
         if (err) {
            reject({ err });
         } else {
            resolve({ err, fields, files })
         }
      });
   });

   const { error } = await supabase.auth.signUp({
      email: (data as formData).fields.email[0],
      password: (data as formData).fields.password[0],
      options: {
         data: {
            username: (data as formData).fields.username[0],
         },
         emailRedirectTo: `${requestHeader}/api/auth/callback`,
      },
   });

   res.status(200).json({
      error
   });
}

export const config = {
   api: {
      bodyParser: false
   }
}