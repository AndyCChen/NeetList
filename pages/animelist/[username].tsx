import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect, useState } from "react"

import AnimeListStyles from '../../styles/AnimeList.module.css'
import SideBar from "../../components/animeList/SideBar"
import AnimeListGroup from "../../components/animeList/AnimeListGroup"
import { AnimeItem } from "../../interfaces/queryInterface"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../interfaces/supabase"
import { AnimeData } from "../../interfaces/userListTypes"

type props = {
	userList: AnimeData[] | null
}

const AnimeList: NextPage<props> = ({ userList }) => {
	console.log(userList)
	const [listSelector, setListSelector] = useState('All');
	const [listCount, setListCount] = useState({
		'All' : 0,
		'Watching' : 0,
		'Planning' : 0,
		'Finished' : 0,
		'Dropped' : 0,
		'Paused' : 0,
	});

	const animeItemList: AnimeItem[] = [
		{
			id: '16498',
			category: 'Watching'
		},
		{
			id: '20958',
			category: 'Planning'
		},
		{
			id: '99147',
			category: 'Planning'
		},
		{
			id: '110277',
			category: 'Planning'
		},
		{
			id: '104578',
			category: 'Finished'
		},
		{
			id: '131681',
			category: 'Finished'
		},
		{
			id: '110445',
			category: 'Dropped'
		},
		{
			id: '100456',
			category: 'Dropped'
		},
		{
			id: '20691',
			category: 'Paused'
		},
		{
			id: '99634',
			category: 'Paused'
		},
	]

	const categories = [
		'Watching',
		'Planning',
		'Finished',
		'Dropped',
		'Paused',
	];

	useEffect(() => {
		let all = 0;
		let watching = 0;
		let planning = 0;
		let finished = 0;
		let dropped = 0;
		let paused = 0;

		animeItemList.forEach((value: AnimeItem) => {
			if (value.category === 'Watching') 
				watching++;
			else if (value.category === 'Planning') 
				planning++;
			else if (value.category === 'Finished') 
				finished++;
			else if (value.category === 'Dropped') 
				dropped++;
			else if (value.category === 'Paused') 
				paused++;

			all++;
		});

		const updatedListCount = {
			'All' : all,
			'Watching': watching,
			'Planning' : planning,
			'Finished' : finished,
			'Dropped' : dropped,
			'Paused' : paused,
		}

		setListCount(updatedListCount);
	}, []);

	return (
		<div className={ AnimeListStyles.contentContainer }>
			<SideBar 
				listSelectorCallback={ (value: string) => setListSelector(value) }
				listCount={ listCount }
			/>
			<div>
				{
					listSelector !== 'All' ?
					<AnimeListGroup
						category={ listSelector } 
						animeItemList={ animeItemList.filter((value: AnimeItem) => value.category === listSelector) }
					/>
					:
					<>
						{
							categories.map((category: string) => 
								<AnimeListGroup 
									key={ category }
									category={ category } 
									animeItemList={ animeItemList.filter((value: AnimeItem) => 
										value.category.localeCompare(category, undefined, { sensitivity: 'accent' })) }
								/>
							)
						}
					</>
				}
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	const supabase = createPagesServerClient<Database>(context);

	const { 
		data: { user } 
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const { data, error} = await supabase
		.from('shows')
		.select()
		.eq('user_id', user.id);

	if (error) {
		return {
			notFound: true
		}
	}

	

	return {
		props: {
			userList: data.length === 0 ? null : data
		}
	}
}

export default AnimeList