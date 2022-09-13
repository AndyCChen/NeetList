import Image from 'next/image'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	coverImageUrl: string,
};

const AnimeCard = ({ coverImageUrl }: Props) => {
	return (
		<div className={ MediaDisplayStyles.animeCard }>
			<Image src={ coverImageUrl } height={400} width={300}/>
		</div>
	)
}

export default AnimeCard