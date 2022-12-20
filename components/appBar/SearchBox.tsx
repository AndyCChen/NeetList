import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import appBarStyles from '../../styles/AppBar.module.css'

const SearchBox = () => {
	const router = useRouter();

	const [searchString, setSearchString] = useState('');

	// route to a new page to display search results after a set delay
	// delay duration resets each time the user enters a new character into search bar
	useEffect(() => {
		const timeout = setTimeout(() => {
			routeToSearchPage(searchString);
		}, 600);

		return () => clearTimeout(timeout);
	}, [searchString]);

	const routeToSearchPage = (searchString: string) => {
		if (searchString.length != 0) {
			router.push(`/search/${encodeURIComponent(searchString)}`);
		} 
		// route back to home page if search input is empty
		else {
			router.push('/');
		}
	}

	return (
		<div className={ appBarStyles.searchBoxContainer}>
			<div className = { appBarStyles.searchIcon}>
				<Image src='/search.svg' alt='search icon' height={35} width={35} layout='fixed' />
			</div>
			<input 
				className={ appBarStyles.searchBox } 
				type='search' placeholder='search anime...' 
				onChange={ (event: React.ChangeEvent<HTMLInputElement>) => setSearchString(event.currentTarget.value) }
			/>
		</div>
	)
}

export default SearchBox