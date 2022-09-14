import Image from 'next/image'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	coverImageUrl: string,
	title: string,
};

const AnimeCard = ({ coverImageUrl, title }: Props) => {
	return (
		<div className={ MediaDisplayStyles.animeCard }>
			<Image src={ coverImageUrl } height={300} width={200} style={{ borderRadius: '8px' }}/>
			<p className={ MediaDisplayStyles.animeCardTitle }>{title}</p>
		</div>
	)
}

export default AnimeCard