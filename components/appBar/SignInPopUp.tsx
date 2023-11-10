import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/legacy/image';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	playFadeIn: boolean,
	showSignInState: boolean,
}

const SignInPopUp = React.forwardRef<HTMLDivElement, Props>(({ playFadeIn, showSignInState }: Props, ref) => {
	const [showSignUp, setShowSignUp] = useState(false);
	const signInHeight = useRef<number | undefined>();
	const signUpHeight = useRef<number | undefined>();

	const onToggle = () => {
		setShowSignUp(!showSignUp);
	}

	return (
		<>
			{ /* don't render signin div when the page is first loaded to prevent fade out animation from playing */ }
			{ showSignInState && 
				<>
					{ /* semi transparent black background div rendered behind the signin popup */}
					<div className={ `${ signInBoxStyles.signInContainerBackground } ${ playFadeIn ? signInBoxStyles.openBackground : signInBoxStyles.closeBackground }` }/>
					<div 
						ref={ ref } 
						className={ `
							${ signInBoxStyles.signInContainer }  
							${ playFadeIn ? signInBoxStyles.openModal : signInBoxStyles.closeModal }` 
						}	
					>
						<div className={ signInBoxStyles.signInImage }>
							<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
						</div>
						{showSignUp ? <SignUpForm setShowSignUp={onToggle}/> : <SignInForm handleClick={onToggle}/>}
					</div>
				</>
			}
		</>
	)
})

// display name
SignInPopUp.displayName = 'SignInPopUp';

export default SignInPopUp