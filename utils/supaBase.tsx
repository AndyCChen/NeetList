import { createClient } from '@supabase/supabase-js'

const project_url = process.env.NEXT_PUBLIC_PROJECT_URL as string;
const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

export const supabase = createClient(project_url , api_key);