import React, { useState } from 'react';
import Image from 'next/image';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	playFadeIn: boolean,
	showSignInState: boolean,
}

const SignInPopUp = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	const [showSignUp, setShowSignUp] = useState(false);

	const _setShowSignUp = () => {
		setShowSignUp(!showSignUp);
	}

	return (
		<>
			{ /* don't render signin div when the page is first loaded to prevent fade out animation from playing */ }
			{ props.showSignInState && 
				<>
					{ /* semi transparent black background div rendered behind the signin popup */}
					<div className={ `${ signInBoxStyles.signInContainerBackground } ${ props.playFadeIn ? signInBoxStyles.openBackground : signInBoxStyles.closeBackground }` }/>
					<div 
						ref={ ref } 
						className={ `${ signInBoxStyles.signInContainer }  ${ props.playFadeIn ? signInBoxStyles.openModal : signInBoxStyles.closeModal }` }	
					>
						<div className={ signInBoxStyles.signInImage }>
							<Image src='/NeetList.svg' alt='NeetList' height={65} width={120} layout='fixed' />
						</div>
						{showSignUp ? <SignUpForm setShowSignUp={_setShowSignUp}/> : <SignInForm handleClick={_setShowSignUp}/>}
					</div>
				</>
			}
		</>
	)
})

export default SignInPopUp