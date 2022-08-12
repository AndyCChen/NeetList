import Image from 'next/image'
import { useState } from 'react'

import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	handleClick: () => void,
}

const SignInForm = ({ handleClick }: Props) => {

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

	return (
		<div className={ signInBoxStyles.signInFormContainer }>
			<p style={{ color: 'white', fontSize: '2rem', marginBottom: '0' }}>
				Login
			</p>
			<p style={{ color: 'white', fontSize: '1rem', opacity: '0.5' }}>
				Welcome back!
			</p>

			<input className={ signInBoxStyles.inputField } type='text' placeholder='Username' onChange={_setUsername}/>
			<input className={ signInBoxStyles.inputField } type='password' placeholder='Password' onChange={_setPassword}/>

			<button className={ signInBoxStyles.submit } onClick={_handleSubmit}>
				<Image src='/arrow-right.svg' alt='submit icon' height={40} width={40} layout='intrinsic' />
			</button>

			<p style={{ color: 'white', opacity: '0.8', fontSize: '0.9rem', textAlign: 'center' }}>
				Don't have an account?
				<button className={ signInBoxStyles.signUp } onClick={handleClick}>
					Create one here!
				</button>
			</p>
		</div>		
	)
}

export default SignInForm