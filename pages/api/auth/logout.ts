import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
   const supabase = createPagesServerClient({req, res})
   await supabase.auth.signOut();
   res.redirect(307, '/');
}