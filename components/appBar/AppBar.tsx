import Image from 'next/image'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import SearchBox from './SearchBox'
import NavButton from './NavButton'
import SignInPopUp from './SignInPopUp'
import DropdownMenu from './DropdownMenu'

import appBarStyles from '../../styles/AppBar.module.css'

const AppBar = () => {
	// true: play fade in animation, else play fade out animation for signin popup
	const [isPopupFadeIn, setPopupFadeIn] = useState(false);

	// true: play fade in animation, else play fade out animation for drop menu
	const [isDropMenuFadeIn, setDropMenuFadeIn] = useState(false);

	// leave signIn popup initially unrendered when page is first loaded
	const [showSignInState, setShowSignInState] = useState(false);

	// leave signIn popup initially unrendered when page is first loaded
	const [showDropMenuState, setShowDropMenuState] = useState(false);

	// bool for if user is logged in
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	// hook to make signInPopup render only once and to stay rendered
	useEffect(() => {
		if (isPopupFadeIn && !showSignInState) {
			setShowSignInState(true);
		}
	}, [isPopupFadeIn]);

	// hook to make dropMenu render only once and to stay rendered
	useEffect(() => {
		if (isDropMenuFadeIn && !showDropMenuState) {
			setShowDropMenuState(true);
		}
	}, [isDropMenuFadeIn]);

	// hook to close signInPopup if clicked outside the component
	const _closeSignPopUp = (ref: RefObject<HTMLDivElement>) => {
		useEffect(() => {
			const _handleClickOutside = (event: MouseEvent) => {
				if (ref.current && !ref.current.contains(event.target as Element) && (event.target as Element).tagName === 'DIV') {
					setPopupFadeIn(false);
				}
			}

			if (isPopupFadeIn) {
				document.addEventListener('click', _handleClickOutside);
			} else {
				document.removeEventListener('click', _handleClickOutside);
			}
		}, [ref, isPopupFadeIn]);
	}

	// toggle sign in box
	const _setPopupFadeIn = (): void => {
		setPopupFadeIn(!isPopupFadeIn);
	}

	// toggle sign in box
	const _setDropMenuFadeIn = (): void => {
		setDropMenuFadeIn(!isDropMenuFadeIn);
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
				{!isLoggedIn ?
					<NavButton scr='/logIn.svg' height={20} width={20} setState={_setPopupFadeIn}>
						<SignInPopUp ref={signInRef} playFadeIn={isPopupFadeIn} showSignInState= {showSignInState}/>
					</NavButton> :
					<NavButton scr='/dropMenu.svg' height={20} width={20} setState={_setDropMenuFadeIn}>
						<DropdownMenu playFadeIn={isDropMenuFadeIn} showDropMenuState={showDropMenuState}/>
					</NavButton>
				}
			</nav>
		</header>
	)
}

export default AppBar