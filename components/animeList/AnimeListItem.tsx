import Image from 'next/image'
import { useState } from 'react';

import editIcon from '../../public/dots.svg';
import AnimeListGroupStyles from '../../styles/AnimeListGroup.module.css'
import EditMenu from './EditMenu';

const AnimeListItem = () => {
	const [toggleEdit, setToggleEdit] = useState(false);

	return (
		<div className={ AnimeListGroupStyles.listItemContainer }>
			<div className={ AnimeListGroupStyles.titleContainer }>
				<div className={ AnimeListGroupStyles.image }>
					<Image
						src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx16498-C6FPmWm59CyP.jpg"
						layout="fill"
						style={{borderRadius: '5px'}}
					/>
				</div>
				<div className={ AnimeListGroupStyles.iconOverlay } onClick={() => setToggleEdit(!toggleEdit)}>
					<div className={ AnimeListGroupStyles.iconWrapper}>
						<Image 
							src= { editIcon } 
							alt='edit show'
							width={20}
							height={20}
						/>
					</div>
				</div>
				<p>Title</p>
			</div>
			<p>1</p>
			<p>2/13</p>
			{toggleEdit && <EditMenu closeEdit={ () => setToggleEdit(false) }/>}
		</div>
	)
}

export default AnimeListItem