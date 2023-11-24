import type { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../interfaces/supabase'
import { Profile } from '../../../interfaces/profile'

export default async function GET(req: NextApiRequest, res: NextApiResponse<Profile>) {
	const supabase = createPagesServerClient<Database>({ req, res });
	let id = req.query.id;

	if (id == undefined) {
		res.status(400).json({
			data: null,
			error: {
				message: 'Unable to fetch user profile!'
			}
		});
		return;
	}
	
	const { data, error } = await supabase
		.from('profiles')
		.select('username, avatar_url')
		.eq('id', id);

	res.status(200).json({
		data: data,
		error: error
	})
}