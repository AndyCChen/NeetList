import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_API_KEY as string;

export async function middleware(req: NextRequest) {
   const res = NextResponse.next();
   const supabase = createMiddlewareClient({ req, res }, { supabaseUrl, supabaseKey });
   await supabase.auth.getSession();

   return res;
}