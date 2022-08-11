import Image from 'next/image'
import { ChangeEvent } from 'react'
import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	setUsername: (event: ChangeEvent<HTMLInputElement>) => void,
	setPassword: (event: ChangeEvent<HTMLInputElement>) => void,
	handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void,
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const SignInForm = ({ setUsername, setPassword, handleSubmit, handleClick }: Props) => {
	return (
		<div className={ signInBoxStyles.signInFormContainer }>
			<p style={{ color: 'white', fontSize: '2rem', marginBottom: '0' }}>
				Sign In
			</p>
			<p style={{ color: 'white', fontSize: '1rem', opacity: '0.5' }}>
				Welcome back!
			</p>

			<input className={ signInBoxStyles.inputField } type='text' placeholder='username' onChange={setUsername}/>
			<input className={ signInBoxStyles.inputField } type='password' placeholder='password' onChange={setPassword}/>

			<button className={ signInBoxStyles.submit } onClick={handleSubmit}>
				<Image src='/arrow-right.svg' alt='submit icon' height={40} width={40} layout='fixed' />
			</button>

			<p style={{ color: 'white', opacity: '0.8', fontSize: '0.9rem', textAlign: 'center' }}>
				Don't have an account?
				<button className={ signInBoxStyles.signUp } onClick={handleClick}>
					Sign Up!
				</button>
			</p>
		</div>		
	)
}

export default SignInForm