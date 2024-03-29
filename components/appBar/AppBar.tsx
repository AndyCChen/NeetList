import Image from 'next/legacy/image'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import SearchBox from './SearchBox'
import NavItem from './NavItem'
import SignInPopUp from './SignInPopUp'
import DropdownMenu from './DropdownMenu'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'

import appBarStyles from '../../styles/AppBar.module.css'

const AppBar = () => {

	const user = useUser();

	// true: play fade in animation, else play fade out animation for signin popup
	const [isPopupFadeIn, setPopupFadeIn] = useState(false);

	// true: play fade in animation, else play fade out animation for drop menu
	const [isDropMenuFadeIn, setDropMenuFadeIn] = useState(false);

	// leave signIn popup initially unrendered when page is first loaded
	const [showSignInState, setShowSignInState] = useState(false);

	// leave signIn popup initially unrendered when page is first loaded
	const [showDropMenuState, setShowDropMenuState] = useState(false);

	// hook to make signInPopup render only once and to stay rendered
	useEffect(() => {
		if (isPopupFadeIn && !showSignInState) {
			setShowSignInState(true);
		}
	}, [isPopupFadeIn, showSignInState]);

	// hook to make dropMenu render only once and to stay rendered
	useEffect(() => {
		if (isDropMenuFadeIn && !showDropMenuState) {
			setShowDropMenuState(true);
		}
	}, [isDropMenuFadeIn, showDropMenuState]);

	// when user logs out un-render dropmenu and set animation to fadeout
	useEffect(() => {
		if (!user) {
			setDropMenuFadeIn(false);
			setShowDropMenuState(false);
		}
	}, [user])

	// hook to close signInPopup if clicked outside the component
	const _closeSignPopUp = (ref: RefObject<HTMLDivElement>) => {
		useEffect(() => {
			const _handleClickOutside = (event: MouseEvent) => {
				if (ref.current && !ref.current.contains(event.target as Element) && (event.target as Element).tagName === 'DIV') {
					setPopupFadeIn(false);
					document.body.style.overflow =  'auto';
				}
			}

			if (isPopupFadeIn) {
				document.addEventListener('click', _handleClickOutside);
			} else {
				document.removeEventListener('click', _handleClickOutside);
			}
		}, [ref, isPopupFadeIn]);
	}

	// hook to close drop menu if clicked outside the component
	const _closeDropMenu = (ref: RefObject<HTMLDivElement>) => {
		useEffect(() => {
			const _handleClickOutside = (event: MouseEvent) => {
				if (ref.current && !ref.current.contains(event.target as Element) && (event.target as Element).id !== 'navButton') {
					setDropMenuFadeIn(false);
				}
			}

			if (isDropMenuFadeIn) {
				document.addEventListener('click', _handleClickOutside);
			} else {
				document.removeEventListener('click', _handleClickOutside);
			}
		}, [ref, isDropMenuFadeIn]);
	}

	// toggle sign in box
	const _setPopupFadeIn = (): void => {
		setPopupFadeIn(!isPopupFadeIn);
		document.body.style.overflow =  'hidden';
	}

	// toggle sign in box
	const _setDropMenuFadeIn = (): void => {
		setDropMenuFadeIn(!isDropMenuFadeIn);
	}

	// ref to the DOM element inside of SignInPopUp and DropMenu component
	const signInRef = useRef<HTMLDivElement>(null);
	const dropMenuRef = useRef<HTMLDivElement>(null);

	_closeSignPopUp(signInRef);
	_closeDropMenu(dropMenuRef);

	return (
		<div className={ appBarStyles.container }>
			<Link className={ appBarStyles.logo } href='/'>
				<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
			</Link>

			<SearchBox />

			<nav className={ appBarStyles.navButtonContainer}> 
				{user ?
					<NavItem scr='/dropMenu.svg' height={20} width={20} setState={ _setDropMenuFadeIn }>
						<DropdownMenu ref={ dropMenuRef } playFadeIn={ isDropMenuFadeIn } showDropMenuState={ showDropMenuState }/>
					</NavItem>
					:
					<NavItem scr='/logIn.svg' height={20} width={20} setState={ _setPopupFadeIn }>
						<SignInPopUp ref={ signInRef } playFadeIn={ isPopupFadeIn } showSignInState= { showSignInState} />
					</NavItem>
				}
			</nav>
		</div>
	)
}

export default AppBar