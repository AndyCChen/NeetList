import AnimeCard from '../components/AnimeCard'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useRef } from 'react';
import { useElementDimensions } from '../hooks/useElementDimensions';

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	animeList: AnimeList,
	title: string,
};

const MediaDisplayBar = ({ animeList , title}: Props) => {
	const columnCount = useMediaQuery(
		[
			'only screen and (max-width: 500px)',
			'only screen and (max-width: 600px)',
			'only screen and (max-width: 1000px)',
			'only screen and (max-width: 1500px)',
		],
		[
			2,
			3,
			4,
			5,
		],
		6
	);
	
	const animeCardRef = useRef<HTMLDivElement>(null);

	const { elementWidth } = useElementDimensions(animeCardRef);
	console.log(elementWidth);

	return (
		<>
			<div className={ MediaDisplayStyles.displayBarContainer }>
				<div>
					<div className={ MediaDisplayStyles.displayBarInfoContainer }>
						<h3 className={ MediaDisplayStyles.title }>{title}</h3>
						<p className ={ MediaDisplayStyles.seeAll }>See All</p>
					</div>
					<div className={ MediaDisplayStyles.animeBarContainer }>
						{
							animeList.media.map((anime: Anime, index: number) =>
								<AnimeCard
									ref={ animeCardRef }
									key={ index }
									coverImageUrl={ anime.coverImage.large }
								/>
							).slice(0, columnCount as number)
						}
					</div>
				</div>
			</div>
			<div className={ MediaDisplayStyles.animeTitleContainer }>
				{
					animeList.media.map((anime: Anime, index) =>
						<p key={ index } className={ MediaDisplayStyles.animeTitle } style={{ width: elementWidth }}>
							{ anime.title.english }
						</p>
					).slice(0, columnCount as number)
				}
			</div>
		</>
	)
}

export default MediaDisplayBar