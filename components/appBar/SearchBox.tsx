import Image from 'next/image'

import appBarStyles from '../../styles/AppBar.module.css'

const SearchBox = () => {
	return (
		<div className={ appBarStyles.searchBoxContainer}>
			<div className = { appBarStyles.searchIcon}>
				<Image src='/search.svg' height={35} width={35} layout='fixed' />
			</div>
			<input className={ appBarStyles.searchBox } type='search' placeholder='search anime...'/>
		</div>
	)
}

export default SearchBox