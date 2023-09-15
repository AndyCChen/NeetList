import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Formidable } from 'formidable';

export const config = {
   api: {
      bodyParser: false
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
   
   res.send(
      req.query
   );
}