import Image from 'next/image'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	coverImageUrl: string,
	title: string,
};

const AnimeCard = ({ coverImageUrl, title }: Props)=> {

	const handleOnLoadingComplete = ({ naturalWidth, naturalHeight }: { naturalWidth: number, naturalHeight: number}) => {
		console.log('naturalWidth', naturalWidth);
	}

	return (
		<div className={ MediaDisplayStyles.animeCard }>
			<div>
				<Image src={ coverImageUrl } layout='responsive' height={300} width={200} style={{ borderRadius: '8px' }}/>
			</div>
			<p className={ MediaDisplayStyles.animeTitle }>{title}</p>
		</div>
	)
}

export default AnimeCard