import Image from 'next/image'
import { useElementDimensions } from '../hooks/useElementDimensions'
import { useRef } from 'react';

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	coverImageUrl: string,
	title: string,
};

const AnimeCard = ({ coverImageUrl, title }: Props) => {
	const animeCardRef = useRef<HTMLDivElement>(null);

	const { elementWidth } = useElementDimensions(animeCardRef);

	return (
		<div ref={ animeCardRef } className={ MediaDisplayStyles.animeCard }>
			<Image src={ coverImageUrl } height={300} width={200} style={{ borderRadius: '8px' }}/>
			<p className={ MediaDisplayStyles.animeCardTitle } >{title}</p>
		</div>
	)
}

export default AnimeCard