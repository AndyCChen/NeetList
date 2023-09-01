import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
   const res = NextResponse.next();
   const supabase = createMiddlewareClient({ req, res });
   const {
      data: { session }
   } = await supabase.auth.getSession();

   // redirect to homepage if user is not authenticated
   if (req.nextUrl.pathname.startsWith('/animelist')) {
      if (!session) {
         const redirectURL = req.nextUrl.clone();
         redirectURL.pathname = '/';
         redirectURL.searchParams.set(`redirected from`, req.nextUrl.pathname);
         return NextResponse.redirect(redirectURL);
      }
   }

   return res;
}