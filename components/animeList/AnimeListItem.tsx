import Image from 'next/legacy/image'
import { useState } from 'react';
import editIcon from '../../public/dots.svg';
import AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import EditMenu from './EditMenu';
import { AnimeData } from '../../interfaces/userListTypes';
import Link from 'next/link';

type Props = {
	anime: AnimeData,
	index: number,
	onDeleteCallBack: (index: number) => void,
}

const AnimeListItem = ({ anime, index, onDeleteCallBack }: Props) => {
	const [show, setShow] = useState(anime);

	const handleShowChange = (anime: AnimeData | null) => {
		if (anime) {
			setShow(anime);
		} else {
			onDeleteCallBack(index);
		}
	}

	return (
		<div className={ AnimeListGroupStyles.listItemContainer }>
			<div className={ AnimeListGroupStyles.titleContainer }>
				<div className={ AnimeListGroupStyles.image }>
				{
					show.imageurl ?
					<Image
						alt={ 'Thumbnail' }
						src={ show.imageurl }
						layout="fill"
						style={{borderRadius: '5px'}}
					/>
					:
					<div/> // empty div if image is null
				}
				</div>
				<div className={ AnimeListGroupStyles.editContainer }>
					<EditMenu
							id={ show.anime_id }
							title={ show.title as string }
							imageURL={ show.imageurl as string }
							anime={ show }
							onSaveCallback={ handleShowChange }
					/>
				</div>
				<div className={ AnimeListGroupStyles.iconOverlay }>
					<Image
						src= { editIcon }
						alt='edit show'
						width={20}
						height={20}
					/>
				</div>
				<Link href={ `/media/${encodeURIComponent(show.anime_id)}` } className={ AnimeListGroupStyles.title }>{ show.title }</Link>
			</div>
			<p>{ show.score }</p>
			<p>{ show.episode_progress }</p>
		</div>
	)
}

export default AnimeListItem