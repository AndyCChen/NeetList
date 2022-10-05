import Image from 'next/image'

import MediaDisplayStyles from '../styles/MediaDisplay.module.css'

type Props = {
	id: number,
	length: number,
	coverImageUrl: string,
	title: string,
	season: string,
	seasonYear: number,
	studio: string,
	format: string,
	episodes: string,
	genres: string[],
};

const getFormat = (format: string): string => {
	switch (format) {
		case 'TV':
			return 'TV Show';
		case 'TV_SHORT':
			return 'TV Short';
		case 'MOVIE':
			return 'Movie';
		case 'SPECIAL':
			return 'Special';
		case 'OVA':
			return 'Ova';
		case 'ONA':
			return 'Ona';
		default:
			return '';
	};

}

const AnimeCard = ({ id, length, coverImageUrl, title, season, seasonYear, studio, format, episodes, genres }: Props)=> {
	return (
		<div className={ MediaDisplayStyles.animeCard}>
			<div>
				<Image src={ coverImageUrl } layout='responsive' height={300} width={200} style={{ borderRadius: '8px' }}/>
			</div>
			<p className={ MediaDisplayStyles.animeTitle }>{title}</p>
			<div className={ id == length - 1? MediaDisplayStyles.toolTipEnd : MediaDisplayStyles.toolTip }>
				<span style={{ color: '#4f4f4f' }}>{season} {seasonYear}</span>
				<p className={ MediaDisplayStyles.studio }>{studio}</p>
				<p className={ MediaDisplayStyles.info }>{getFormat(format)}  &#8226; {episodes} episodes</p>
				<p>{genres}</p>
			</div>
		</div>
	)
}

export default AnimeCard