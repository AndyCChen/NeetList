import AnimeCard from '../components/AnimeCard'
import { AnimeList, Anime } from '../interfaces/queryInterface'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	animeList: AnimeList,
	title: string,
};

const MediaDisplayBar = ({ animeList , title}: Props) => {
	
	return (
		<div className={ MediaDisplayStyles.displayBarContainerWrapper }>
			<div className={ MediaDisplayStyles.displayBarContainer }>
				<div className={ MediaDisplayStyles.displayBarInfoContainer }>
					<p className={ MediaDisplayStyles.title }>{title}</p>
					<p className ={ MediaDisplayStyles.viewAll }>View All</p>
				</div>
				<div className={ MediaDisplayStyles.animeBarContainer }>
					{
						animeList.media.map((anime: Anime, index: number) =>
							<AnimeCard coverImageUrl={ anime.coverImage.large } key={ index }/>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default MediaDisplayBar