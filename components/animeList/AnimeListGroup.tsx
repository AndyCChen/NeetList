import { AnimeItem } from '../../interfaces/queryInterface'
import  AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import AnimeListItem from './AnimeListItem'

type Props = {
	category: string,
	animeItemList: AnimeItem[];
}

const AnimeListGroup = ({ category, animeItemList }: Props) => {
	
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
			</div>
		</div>
	)
}

export default AnimeListGroup