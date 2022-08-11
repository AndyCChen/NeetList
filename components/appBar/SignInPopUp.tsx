import React from 'react';
import Image from 'next/image';

import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	showSignIn: boolean,
	initialShowSignInState: boolean,
}

const SignInPopUp = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	// user sign in info submit handler
	const _handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log('submitted!')
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
						<div className={ signInBoxStyles.signInFormContainer }>
							<p style={{ color: 'white', fontSize: '2rem', marginBottom: '0' }}>
								Sign In
							</p>
							<p style={{ color: 'white', fontSize: '1rem', opacity: '0.5' }}>
								Welcome back!
							</p>

							<input className={ signInBoxStyles.inputField } type='text' placeholder='username'/>
							<input className={ signInBoxStyles.inputField } type='text' placeholder='password'/>
							<button className={ signInBoxStyles.submit } onClick={_handleSubmit}>
								<Image src='/arrow-right.svg' alt='submit icon' height={40} width={40} layout='fixed' />
							</button>

							<p style={{ color: 'black', fontSize: '0.8rem', textAlign: 'center' }}>
								Don't have an account?
								<button className={ signInBoxStyles.signUp } onClick={_handleClick}>
									Sign Up!
								</button>
							</p>
						</div>
					</div>
				</>
			}
		</>
	)
})

export default SignInPopUp