import Image from 'next/image'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import SignInPopUp from './SignInPopUp'

import appBarStyles from '../../styles/AppBar.module.css'

const AppBar = () => {
	// bool for controlling if signInBox is shown or not
	const [showSignIn, setShowSignIn] = useState(false);

	// hide signIn popup initially when page is first loaded
	const [initialShowSignInState, setInitialShowSignInState] = useState(false);

	// hook to only set the initial vlaue of initialShowSignInState to true once
	useEffect(() => {
		if (showSignIn && !initialShowSignInState) {
			setInitialShowSignInState(true);
		}
	}, [showSignIn]);

	// toggle sign in box
	const _setShowSignIn = (): void => {
		setShowSignIn(!showSignIn);
	}

	// hook to close signInPopup if clicked outside the component
	const _closeSignPopUp = (ref: RefObject<HTMLDivElement>) => {
		useEffect(() => {
			const _handleClickOutside = (event: MouseEvent) => {
				if (ref.current && !ref.current.contains(event.target as Element) && (event.target as Element).tagName === 'DIV') {
					setShowSignIn(false);
				}
			}

			if (showSignIn) {
				document.addEventListener('click', _handleClickOutside);
			} else {
				document.removeEventListener('click', _handleClickOutside);
			}
		}, [ref, showSignIn]);
	}

	// ref to the DOM element inside of SignInPopUp component
	const signInRef = useRef<HTMLDivElement>(null);
	
	_closeSignPopUp(signInRef);

	return (
		<header  className={ appBarStyles.container }>
			<div className={ appBarStyles.logo }>
				<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
			</div>

			<SearchBox />

			<nav className={ appBarStyles.navButtonContainer}>
				<NavButton scr='/logIn.svg' height={20} width={20} setState={_setShowSignIn}/>
         	<SignInPopUp ref={signInRef} showSignIn={showSignIn} initialShowSignInState= { initialShowSignInState }/>
			</nav>
		</header>
	)
}

export default AppBar