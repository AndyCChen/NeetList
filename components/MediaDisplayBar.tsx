import AnimeCard from '../components/AnimeCard'
import { AnimeList, Anime } from '../interfaces/queryInterface'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	animeList: AnimeList,
	title: string,
};

const MediaDisplayBar = ({ animeList , title}: Props) => {
	
	return (
		<div>
			<h3 className={ MediaDisplayStyles.title }>{title}</h3>
			<div className={ MediaDisplayStyles.displayBarContainer }>
				{
					animeList.media.map((anime: Anime, index: number) =>
						<AnimeCard coverImageUrl={ anime.coverImage.large } key={ index }/>
					)
				}
			</div>
		</div>
	)
}

export default MediaDisplayBar