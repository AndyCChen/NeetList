

import  AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import AnimeListItem from './AnimeListItem'
import { AnimeItem } from '../../interfaces/queryInterface'

type Props = {
	category: string,
}

const AnimeListGroup = ({ category }: Props) => {
	return (
		<div>
			<p className={ AnimeListGroupStyles.listName }>
				{ category }
			</p>
			<div className={ AnimeListGroupStyles.listContainer }>
				<div className={ AnimeListGroupStyles.listHeader }>
					<p>Title</p>
					<p>Score</p>
					<p>Progress</p>
				</div>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
			</div>
		</div>
	)
}

export default AnimeListGroup