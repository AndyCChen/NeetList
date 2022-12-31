import { Anime } from '../interfaces/queryInterface'

import GridStyles from '../styles/SearchPage.module.css'

type Props = {
	animeList: Anime[],
	children: React.ReactNode,
}

const MediaDisplayGrid = ({ animeList, children }: Props) => {
	return (
		<div className={ GridStyles.grid }>
			{ children }	
		</div>
	)
}

export default MediaDisplayGrid