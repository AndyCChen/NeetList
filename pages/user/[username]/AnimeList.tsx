import { NextPage } from "next/types"
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import AnimeListStyles from '../../../styles/AnimeList.module.css'
import SideBar from '../../../components/animeList/SideBar'
import AnimeListGroup from "../../../components/animeList/AnimeListGroup"

const AnimeList: NextPage = ({  }) => {
	return (
		<div className={ AnimeListStyles.contentContainer }>
			<SideBar/>
			<div>
				<AnimeListGroup/>
				<AnimeListGroup/>
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