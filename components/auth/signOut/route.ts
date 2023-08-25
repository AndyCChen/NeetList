import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
   const supabase = createRouteHandlerClient({ cookies });

   
}