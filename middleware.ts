import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest ) {
   const res = NextResponse.next();
   const supabase = createMiddlewareClient({ req, res });

   const { data: { user }} = await supabase.auth.getUser();

   // if user is not signed in, redirect to home page if not already at home page
   if (!user) {
      return NextResponse.redirect(new URL('/', req.url));
   }

   return res;
}

export const config = {
   matcher: '/user/:path',
}