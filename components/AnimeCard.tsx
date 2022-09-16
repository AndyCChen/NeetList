import Image from 'next/image'
import React from 'react';

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	coverImageUrl: string,
};

const AnimeCard = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	return (
		<div>
			<div ref={ ref } className={ MediaDisplayStyles.animeCard }>
				<Image src={ props.coverImageUrl } height={300} width={200} style={{ borderRadius: '8px' }}/>
			</div>
		</div>
	)
})

export default AnimeCard