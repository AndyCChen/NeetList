import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from 'formidable';

type formData = {
   fields: {
      email: string[],
      password: string[],
   }
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
   const supabase = createPagesServerClient({ req, res });
   
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

   const { error } = await supabase.auth.signInWithPassword({
      email: (data as formData).fields.email[0],
      password: (data as formData).fields.password[0]
   })

   res.status(200).json({
      error
   });
}

export const config = {
   api: {
      bodyParser: false
   }
}