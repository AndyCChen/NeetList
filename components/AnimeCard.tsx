import Image from 'next/image'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	id: number,
	length: number,
	coverImageUrl: string,
	title: string,
	season: string,
	seasonYear: number
};

const AnimeCard = ({ id, length, coverImageUrl, title, season, seasonYear }: Props)=> {
	console.log(id);
	return (
		<div className={ MediaDisplayStyles.animeCard}>
			<div>
				<Image src={ coverImageUrl } layout='responsive' height={300} width={200} style={{ borderRadius: '8px' }}/>
			</div>
			<p className={ MediaDisplayStyles.animeTitle }>{title}</p>
			<div className={ id == length - 1? MediaDisplayStyles.toolTipEnd : MediaDisplayStyles.toolTip }>
				<span>{season} </span>
				<span>{seasonYear}</span>
			</div>
		</div>
	)
}

export default AnimeCard