import React from 'react'
import appBarStyles from '../../styles/AppBar.module.css'

type Props = {
	showSignIn: boolean,
	initialShowSignInState: boolean,
}

const SignInPopUp = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	return (
		<>
			{
				// don't render signin div when the page is first loaded to prevent fade out animation from playing
				props.initialShowSignInState && 
					<>
						<div className={ `${ appBarStyles.signInContainerBackground } ${ props.showSignIn ? appBarStyles.openBackground : appBarStyles.closeBackground }` }/>
						<div 
							ref={ ref } 
							className={ `${ appBarStyles.signInContainer }  ${ props.showSignIn ? appBarStyles.openModal : appBarStyles.closeModal }` }	
						>
							<input type='text' placeholder='username'/>
						</div>
					</>
			}
		</>
	)
})

export default SignInPopUp