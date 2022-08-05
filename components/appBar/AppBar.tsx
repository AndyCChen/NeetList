import SearchBox from './SearchBox'
import Image from 'next/image'

import appBarStyles from '../../styles/AppBar.module.css'

const AppBar = () => {
	return (
		<header  className={ appBarStyles.container }>
			<div className={ appBarStyles.logo } >
				<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
			</div>
			<SearchBox />

			<div className={ appBarStyles.dropMenu }>
				<Image src='/dropMenu.svg' alt='DropMenu' height={65} width={120} layout='fixed' />
			</div>
		</header>



		
	)
}

export default AppBar