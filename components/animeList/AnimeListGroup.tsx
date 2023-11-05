import { AnimeData } from '../../interfaces/userListTypes';
import  AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import AnimeListItem from './AnimeListItem'

type Props = {
	category: string,
	animeList: AnimeData[];
	deleteShowAt: (show_id: string) => void
}

const AnimeListGroup = ({ category, animeList, deleteShowAt }: Props) => {
	
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
				{
					animeList.map((value: AnimeData, index: number) =>
						<AnimeListItem
							key={ value.anime_id }
							anime={ value }
							onDeleteCallBack={ deleteShowAt }
						/>
					)
				}
			</div>
		</div>
	)
}

export default AnimeListGroup