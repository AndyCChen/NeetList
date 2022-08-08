import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import SignInPopUp from './SignInPopUp'

import appBarStyles from '../../styles/AppBar.module.css'

const AppBar = () => {
	const [showSignIn, setShowSignIn] = useState(false);


	const _setShowSignIn = () => {
		setShowSignIn(!showSignIn);
	}

	return (
		<header  className={ appBarStyles.container }>
			<div className={ appBarStyles.logo }>
				<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
			</div>

			<SearchBox />

			<nav className={ appBarStyles.navButtonContainer}>
				<NavButton scr='/logIn.svg' height={20} width={20} setState={_setShowSignIn}/>
				<SignInPopUp showSignIn={showSignIn}/>
			</nav>
		</header>
	)
}

export default AppBar