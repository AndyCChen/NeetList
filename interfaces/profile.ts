import { PostgrestError } from '@supabase/supabase-js';

export interface Profile {
	data: {
		username: string | null,
		avatar_url: string | null,
	}[] | null,
	error: PostgrestError | null | { message: string }
}
