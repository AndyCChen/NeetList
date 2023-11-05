import { AnimeData } from '../../interfaces/userListTypes';
import { useState } from 'react';
import  AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import AnimeListItem from './AnimeListItem'

type Props = {
	category: string,
	animeList: AnimeData[];
}

const AnimeListGroup = ({ category, animeList }: Props) => {
	const [showList, setShowList] = useState(animeList);

	const deleteShowAt = (index: number) => {
		const filteredListGroup = showList.filter((value, showIndex) => showIndex !== index);
		setShowList(filteredListGroup)
		console.log(filteredListGroup)
	}
	
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
					showList.map((value: AnimeData, index: number) =>
						<AnimeListItem
							key={ value.anime_id }
							anime={ value }
							index={ index }
							onDeleteCallBack={ deleteShowAt }
						/>
					)
				}
			</div>
		</div>
	)
}

export default AnimeListGroup