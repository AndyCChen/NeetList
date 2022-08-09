import React from 'react'
import appBarStyles from '../../styles/AppBar.module.css'

type Props = {
	showSignIn: boolean,
}

const SignInPopUp = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	return (
		<div 
			ref={ ref } 
			className={ `${ appBarStyles.signInContainer }  ${ props.showSignIn ? appBarStyles.openModal : appBarStyles.closeModal }` }	
		>
			<input type='text' placeholder='username'/>
		</div>
	)
})

export default SignInPopUp