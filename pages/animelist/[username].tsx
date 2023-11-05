import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect, useState } from "react"

import AnimeListStyles from '../../styles/AnimeList.module.css'
import SideBar from "../../components/animeList/SideBar"
import AnimeListGroup from "../../components/animeList/AnimeListGroup"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../../interfaces/supabase"
import { AnimeData } from "../../interfaces/userListTypes"

type props = {
	userList: AnimeData[] | null
}

type ListCount = {
	'All' : number,
	'Watching': number,
	'Planning': number,
	'Finished': number,
	'Dropped': number,
	'Paused': number,
}

const AnimeList: NextPage<props> = ({ userList }) => {
	const [listSelector, setListSelector] = useState('All');

	const [listCount, setListCount] = useState({
		'All' : 0,
		'Watching' : 0,
		'Planning' : 0,
		'Finished' : 0,
		'Dropped' : 0,
		'Paused' : 0,
	});

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

		if (userList) {
			userList.forEach((value: AnimeData) => {
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
		}

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

	const renderAllCategories = (animeList: AnimeData[]):JSX.Element => {
		return(
			<>
			{
				categories.map((category: string) => {
					if (listCount[category as keyof ListCount] !== 0) {
						return(
							<AnimeListGroup
								key={ category }
								category={ category }
								animeList={ animeList.filter((value: AnimeData) =>
									value.category.localeCompare(category, undefined, { sensitivity: 'accent' }) === 0
								)}
							/>
						)
					}
				})
			}
			</>
		)
	}

	const renderSelectedCategories = (animeList: AnimeData[], category: string):JSX.Element => {
		return(
			<>
			{
				<AnimeListGroup
					category={ category }
					animeList={ animeList.filter((value: AnimeData) => value.category === category) }
				/>
			}
			</>
		)
	}

	return (
		<div className={ AnimeListStyles.contentContainer }>
			<SideBar 
				listSelectorCallback={ (value: string) => setListSelector(value) }
				listCount={ listCount }
			/>
			{
				!userList ?
				<div className={ AnimeListStyles.noLists }>No shows add yet!</div>
				:
				<div>
				{
					listSelector !== 'All' ? renderSelectedCategories(userList, listSelector) : renderAllCategories(userList)
				}
				</div>
			}
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
			notFound: true,
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