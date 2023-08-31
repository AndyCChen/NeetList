import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Error from './Error';

import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	setShowSignUp: () => void,
}

const SignUpForm = ({ setShowSignUp }: Props) => {
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const supabase = createClientComponentClient();

	const _setShowError = () => {
		setShowError(!showError);
	}

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const _setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	}

	const _setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.currentTarget.value);
	}

	const _setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	}

	const _setConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.currentTarget.value);
	}

	const _handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (email.length === 0 || username.length === 0 || password.length === 0 || confirmPassword.length === 0) {
			setErrorMessage('Please fill in all fields!');
			setShowError(true);
			return;
		} else if (password !== confirmPassword) {
			setErrorMessage('Password confirmation does not match!');
			setShowError(true);
			return;
		} else if (username.length > 15 ) {
			setErrorMessage('Username must be under 15 characters');
			setShowError(true);
			return;
		}

		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					username: username
				},
				emailRedirectTo: `${location.origin}/auth/callback`,
			}
		});

		if (error) {
			setErrorMessage(error.message);
			setShowError(true);
		} else {
			
		}

		document.body.style.overflow = 'auto';
	}

	return (
		<div className={ signInBoxStyles.signInFormContainer }>
			<p style={{ color: 'white', fontSize: '2rem', marginBottom: '0', marginTop: '0'  }}>
				Sign Up
			</p>
			<p style={{ color: 'white', fontSize: '1rem', opacity: '0.5' }}>
				Make an account to use extra features!
			</p>

			{showError && <Error errorMessage={ errorMessage } setShowError={_setShowError}/>}

			<input className={ signInBoxStyles.inputField } type='email' placeholder='Email' onChange={_setEmail}/>
			<input className={ signInBoxStyles.inputField } type='text' placeholder='Username' onChange={_setUsername}/>
			<input className={ signInBoxStyles.inputField } type='password' placeholder='Password' onChange={_setPassword}/>
			<input className={ signInBoxStyles.inputField } type='password' placeholder='Password confirmation' onChange={_setConfirmPassword}/>

			<button className={ signInBoxStyles.submit } onClick={_handleSubmit}>
				<Image src='/arrow-right.svg' alt='submit icon' height={40} width={40} layout='fixed' />
			</button>

			<p style={{color: 'white', opacity: '0.8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '0' }}>
				Already have an account?
				<button className={ signInBoxStyles.signUp } onClick={setShowSignUp}>
					Sign in!
				</button>
			</p>

		</div>
	)
}

export default SignUpForm