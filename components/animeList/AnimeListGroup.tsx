

import  AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import AnimeListItem from './AnimeListItem'

const AnimeListGroup = () => {
	return (
		<div>
			<p className={ AnimeListGroupStyles.listName }>Watching</p>
			<div className={ AnimeListGroupStyles.listContainer }>
				<div className={ AnimeListGroupStyles.listHeader }>
					<p>Title</p>
					<p>Score</p>
					<p>Progress</p>
				</div>
				<AnimeListItem/>
				<AnimeListItem/>
				<AnimeListItem/>
			</div>
		</div>
	)
}

export default AnimeListGroup