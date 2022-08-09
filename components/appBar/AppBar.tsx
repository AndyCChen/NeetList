import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import SignInPopUp from './SignInPopUp'

import appBarStyles from '../../styles/AppBar.module.css'

const AppBar = () => {
	// bool for controlling if signInBox is shown or not
	const [showSignIn, setShowSignIn] = useState(false);

	// ref to the DOM element inside of SignInPopUp component
	const signInRef = useRef(null);

	// toggle sign in box
	const _setShowSignIn = (): void => {
		setShowSignIn(!showSignIn);
	}

	// hoook to close signInPopup if clicked outside the component
	const _closeSignPopUp = (ref: any) => {
		useEffect(() => {
			const _handleClickOutside = (event: any) => {
				if (ref.current && !ref.current.contains(event.target) && event.target.tagName === 'DIV') {
					setShowSignIn(false);
				}
			}

			if (showSignIn) {
				document.addEventListener('click', _handleClickOutside);
			} else {
				document.removeEventListener('click', _handleClickOutside);
			}
		},[showSignIn]);
	}

	_closeSignPopUp(signInRef);

	return (
		<header  className={ appBarStyles.container }>
			<div className={ appBarStyles.logo }>
				<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
			</div>

			<SearchBox />

			<nav className={ appBarStyles.navButtonContainer}>
				<NavButton scr='/logIn.svg' height={20} width={20} setState={_setShowSignIn}/>
				{/*  semi transparent div background when signin popup appears */}
				{showSignIn && <div className={ appBarStyles.signInContainerBackground }></div>}
				<SignInPopUp ref={signInRef} showSignIn={showSignIn}/>
			</nav>
		</header>
	)
}

export default AppBar