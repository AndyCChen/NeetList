import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect, useState } from "react"

import AnimeListStyles from '../../../styles/AnimeList.module.css'
import SideBar from '../../../components/animeList/SideBar'
import AnimeListGroup from "../../../components/animeList/AnimeListGroup"
import { AnimeItem } from "../../../interfaces/queryInterface"

type Props = {
	animeItem: AnimeItem[],
}

const AnimeList: NextPage = ({  }) => {

	const animeItemList: AnimeItem[] = [
		
	]

	const categories = [
		'Watching',
		'Planning',
		'Finished',
		'Droppped',
		'Paused',
	];

	const [listSelector, setListSelector] = useState('All');

	const lists = categories.map((value, index) => {
		
	})

	useEffect(() => {
		console.log(listSelector)
	}, [listSelector])

	return (
		<div className={ AnimeListStyles.contentContainer }>
			<SideBar listSelectorCallback={ (value: string) => setListSelector(value) }/>
			<div>
				{
					listSelector === 'Watching' && <AnimeListGroup category= 'Watching'/>
				}
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
	let username;

	if (context.params) {
		username = context.params.username;
	}

	return {
		props: {
		username,
		}
	}
}

export default AnimeList