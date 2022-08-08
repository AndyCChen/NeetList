import { useEffect } from 'react'

import appBarStyles from '../../styles/AppBar.module.css'

type Props = {
	showSignIn: boolean
}

const SignInPopUp = ({ showSignIn }: Props) => {

	return (
		<div id='signIn' className={ `${ appBarStyles.signInContainer }  ${ showSignIn ? appBarStyles.openModal : appBarStyles.closeModal }` }>
			<input type='text' placeholder='username'/>
		</div>
	)
}

export default SignInPopUp