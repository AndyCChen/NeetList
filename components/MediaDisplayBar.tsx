import AnimeCard from '../components/AnimeCard'
import { AnimeList, Anime } from '../interfaces/queryInterface'
import { useMediaQuery } from '../hooks/useMediaQuery';
import React, { useEffect } from 'react';
import Link from 'next/link';

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	animeList: AnimeList,
	title: string,
};

const MediaDisplayBar = ({ animeList , title}: Props) => {
	let sort_by: string;
	if (title == 'POPULAR THIS SEASON') sort_by = 'this-season'
	else if (title == 'All TIME POPULAR') sort_by = 'popular'
	else sort_by = 'next-season'

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
					<Link className ={ MediaDisplayStyles.seeAll } href={`/anime/${ encodeURIComponent(sort_by) }`}>
						<p >See All</p>
					</Link>
				</div>
				<div className={ MediaDisplayStyles.animeBarContainer }>
				{
					animeList.media.map((anime: Anime, index: number) =>
						<React.Fragment key={ anime.id }>
							<AnimeCard
								id={ anime.id }
								coverImageUrl={ anime.coverImage.large }
								title={ anime.title.english ? anime.title.english : anime.title.romaji }
								season={ anime.season }
								seasonYear={ anime.seasonYear }
								studio={ anime.studios.nodes.length != 0 ? anime.studios.nodes[0].name : "" }
								format={ anime.format }
								episodes={ anime.episodes }
								genres={ anime.genres }
							/>
						</React.Fragment>
					).slice(0, columnCount)
				}
				</div>
			</div>
		</div>
	)
}

export default MediaDisplayBar