import Image from 'next/legacy/image'
import { useState } from 'react'
import Error from './Error'

import signInBoxStyles from '../../styles/SignInBox.module.css'
import { useRouter } from 'next/router'

type Props = {
	handleClick: () => void,
}

const SignInForm = ({ handleClick }: Props) => {
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const _setShowError = () => {
		setShowError(!showError);
	}

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const _setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
	}

	const _setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
	}

	// user sign in info submit handler
	const _handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (email.length === 0 || password.length === 0) {
			setErrorMessage('Please fill out both fields!');
			setShowError(true);
			return;
		}

		const formdata = new FormData(event.currentTarget);

		const loginResponse = await fetch('/api/auth/login', {
			method: 'POST',
			body: formdata,
		});

		const res = await loginResponse.json();

		if (res.error) {
			setErrorMessage(res.error.message as string);
			setShowError(true);
		} else {
			router.reload();
		}

		document.body.style.overflow =  'auto';
	}

	return (
		<div className={ signInBoxStyles.signInFormContainer }>
			<p style={{ color: 'white', fontSize: '2rem', marginBottom: '0', marginTop: '0'}}>
				Login
			</p>
			<p style={{ color: 'white', fontSize: '1rem', opacity: '0.5' }}>
				Welcome back!
			</p>

			{showError && <Error errorMessage={ errorMessage } setShowError={_setShowError}/>}

			<form className={ signInBoxStyles.form }  onSubmit={ _handleSubmit }>
				<input className={ signInBoxStyles.inputField } type='email' placeholder='Email' onChange={_setUsername} name='email' />
				<input className={ signInBoxStyles.inputField } type='password' placeholder='Password' onChange={_setPassword} name='password' />
				<button className={ signInBoxStyles.submit } type='submit'>
					<Image src='/arrow-right.svg' alt='submit icon' height={40} width={40} layout='intrinsic' />
				</button>
			</form>

			<p style={{ color: 'white', opacity: '0.8', fontSize: '0.9rem', textAlign: 'center', marginBottom: '0' }}>
				Don&apos;t have an account?
				<button className={ signInBoxStyles.signUp } onClick={handleClick}>
					Create one here!
				</button>
			</p>
		</div>		
	)
}

export default SignInForm