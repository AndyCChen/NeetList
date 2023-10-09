import Image from 'next/legacy/image'

import editIcon from '../../public/dots.svg';
import AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import EditMenu from './EditMenu';
import { AnimeData } from '../../interfaces/userListTypes';
import Link from 'next/link';

type Props = {
	anime: AnimeData
}

const AnimeListItem = ({ anime }: Props) => {
	return (
		<div className={ AnimeListGroupStyles.listItemContainer }>
			<div className={ AnimeListGroupStyles.titleContainer }>
				<div className={ AnimeListGroupStyles.image }>
				{
					anime.imageurl ?
					<Image
						alt={ 'Thumbnail' }
						src={ anime.imageurl }
						layout="fill"
						style={{borderRadius: '5px'}}
					/>
					:
					<div/>
				}
				</div>
				<div className={ AnimeListGroupStyles.iconOverlay }>
					<div className={ AnimeListGroupStyles.iconWrapper}>
						<Image 
							src= { editIcon } 
							alt='edit show'
							width={20}
							height={20}
						/>
						<EditMenu 
							id={ anime.anime_id } 
							title={ anime.title as string } 
							imageURL={ anime.imageurl as string } 
							anime={ anime }							
						/>
					</div>
				</div>
				<Link href={ `/media/${encodeURIComponent(anime.anime_id)}` } className={ AnimeListGroupStyles.title }>{ anime.title }</Link>
			</div>
			<p>{ anime.score }</p>
			<p>{ anime.episode_progress }</p>
		</div>
	)
}

export default AnimeListItem