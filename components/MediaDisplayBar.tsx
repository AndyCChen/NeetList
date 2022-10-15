import AnimeCard from '../components/AnimeCard'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { useMediaQuery } from '../hooks/useMediaQuery';
import Link from 'next/link';

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

	return (
		<div className={ MediaDisplayStyles.displayBarContainerWrapper }>
			<div className={ MediaDisplayStyles.displayBarContainer }>
				<div className={ MediaDisplayStyles.displayBarInfoContainer }>
					<h3 className={ MediaDisplayStyles.title }>{ title }</h3>
					<p className ={ MediaDisplayStyles.seeAll }>See All</p>
				</div>
				<div className={ MediaDisplayStyles.animeBarContainer }>
					{
						animeList.media.map((anime: Anime, index: number) =>
							<Link href={ `/media/${encodeURIComponent(anime.id)}` }>
								<a className={ MediaDisplayStyles.animeCard }>
									<AnimeCard
										key={ index }
										id={ index }
										length={ animeList.media.slice(0, columnCount as number).length }
										coverImageUrl={ anime.coverImage.large }
										title={ anime.title.english }
										season={ anime.season }
										seasonYear={ anime.seasonYear }
										studio={ anime.studios.nodes[0].name }
										format={ anime.format }
										episodes={ anime.episodes }
										genres={ anime.genres }
									/>
								</a>
							</Link>
						).slice(0, columnCount as number)
					}
				</div>
			</div>
		</div>
	)
}

export default MediaDisplayBar