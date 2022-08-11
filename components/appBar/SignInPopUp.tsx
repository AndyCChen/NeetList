import React, { useState } from 'react';
import Image from 'next/image';
import SignInForm from './SignInForm';

import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	showSignIn: boolean,
	initialShowSignInState: boolean,
}

const SignInPopUp = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const _setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.currentTarget.value);
	}

	const _setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	}

	// user sign in info submit handler
	const _handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (username.length === 0 || password.length === 0) {
			alert('Please fill out all fields!');
		}

		console.log('Username', username);
		console.log('Password', password);
		event.preventDefault();
	}

	// go to sign up menu on click
	const _handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log('going to sign up!');
	}

	return (
		<>
			{ /* don't render signin div when the page is first loaded to prevent fade out animation from playing */ }
			{ props.initialShowSignInState && 
				<>
					{ /* semi transparent black background div rendered behind the signin popup */}
					<div className={ `${ signInBoxStyles.signInContainerBackground } ${ props.showSignIn ? signInBoxStyles.openBackground : signInBoxStyles.closeBackground }` }/>
					<div 
						ref={ ref } 
						className={ `${ signInBoxStyles.signInContainer }  ${ props.showSignIn ? signInBoxStyles.openModal : signInBoxStyles.closeModal }` }	
					>
						<div className={ signInBoxStyles.signInImage }>
							<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
						</div>
						<SignInForm setUsername={_setUsername} setPassword={_setPassword} handleSubmit={_handleSubmit} handleClick={_handleClick} />
					</div>
				</>
			}
		</>
	)
})

export default SignInPopUp