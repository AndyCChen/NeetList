import Link from 'next/link'
import { Anime } from '../interfaces/queryInterface'
import AnimeCard from './AnimeCard'

import GridStyles from '../styles/SearchPage.module.css'
import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	animeList: Anime[],
}

const MediaDisplayGrid = ({ animeList }: Props) => {
	return (
		<div className={ GridStyles.grid }>
			{
				animeList.map((anime: Anime, index: number) =>
					<Link href={ `/media/${encodeURIComponent(anime.id)}` } key={ index }>
						<div className={ MediaDisplayStyles.animeCard }>
							<AnimeCard
								id={ index }
								length={ 0 }
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