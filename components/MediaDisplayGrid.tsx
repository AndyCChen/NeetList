import Link from 'next/link'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import AnimeCard from './AnimeCard'

import gridStyles from '../styles/MediaGrid.module.css'
import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	animeList: AnimeList,
}

const MediaDisplayGrid = ({ animeList }: Props) => {

	const anime = animeList.media[0];

	return (
		<div className={ gridStyles.grid }>
			{
				animeList.media.map((anime: Anime, index: number) =>
					<Link href={ `/media/${encodeURIComponent(anime.id)}` } key={ index }>
						<div className={ MediaDisplayStyles.animeCard }>
							<AnimeCard
								id={ index }
								length={ animeList.media.slice(0, 5).length }
								coverImageUrl={ anime.coverImage.large }
								title={ anime.title.english ? anime.title.english : anime.title.romaji }
								season={ anime.season ? anime.season : 'TBA' }
								seasonYear={ anime.seasonYear && anime.seasonYear }
								studio={ anime.studios.nodes.length != 0 ? anime.studios.nodes[0].name : ''}
								format={ anime.format }
								episodes={ anime.episodes }
								genres={ anime.genres }
							/>
						</div>
					</Link>
				)
			}
		</div>
	)
}

export default MediaDisplayGrid

/*
<div className={ gridStyles.gridWrapper }>
			<div className={ gridStyles.grid }>
			{
				animeList.media.map((anime: Anime, index: number) =>
					<Link href={ `/media/${encodeURIComponent(anime.id)}` } key={ index }>
						<a className={ MediaDisplayStyles.animecard }>
							<AnimeCard
								id={ index }
								length={ animeList.media.slice(0, 5).length }
								coverImageUrl={ anime.coverImage.large }
								title={ anime.title.english ? anime.title.english : anime.title.romaji }
								season={ anime.season }
								seasonYear={ anime.seasonYear }
								studio={ anime.studios.nodes.length != 0 ? anime.studios.nodes[0].name : ''}
								format={ anime.format }
								episodes={ anime.episodes }
								genres={ anime.genres }
							/>
						</a>
					</Link>
				)
			}
			</div>
		</div>
*/