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
					<h3 className={ MediaDisplayStyles.title }>{title}</h3>
					<p className ={ MediaDisplayStyles.seeAll }>See All</p>
				</div>
				<div className={ MediaDisplayStyles.animeBarContainer }>
					{
						animeList.media.map((anime: Anime, index: number) =>
							<AnimeCard
								key={ index }
								coverImageUrl={ anime.coverImage.large }
								title={ anime.title.english }
							/>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default MediaDisplayBar