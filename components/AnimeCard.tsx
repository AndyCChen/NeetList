import Image from 'next/image'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	coverImageUrl: string,
};

const AnimeCard = ({ coverImageUrl }: Props) => {
	return (
		<div className={ MediaDisplayStyles.animeCard }>
			<Image src={ coverImageUrl } height={300} width={200} style={{ borderRadius: '8px' }}/>
		</div>
	)
}

export default AnimeCard