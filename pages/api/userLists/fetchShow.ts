import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from '../../../interfaces/supabase'

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
   const supabase = createPagesServerClient<Database>({ req, res });

   const id = req.query.id as string;

   const {
      data: { user }
   } = await supabase.auth.getUser();
      
}