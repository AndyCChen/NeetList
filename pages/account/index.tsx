import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import AccountStyles from '../../styles/AccountPage.module.css'

type Props = {
	user_name: string,
	user_email: string,
}

const Account: NextPage<Props> = ({ user_name, user_email }) => {
	const [username, setUsername] = useState(user_name);
	const [updateUsername, setUpdateUsername] = useState(false);

	const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	}

	const onUsernameUpdate = () => {

	}

	useEffect(() => {
		if (username !== user_name)
			setUpdateUsername(true);
		else
			setUpdateUsername(false);
	}, [username])

	const [email, setEmail] = useState(user_email);
	const [updateEmail, setUpdateEmail] = useState(false);

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const onEmailUpdate = () => {

	}

	useEffect(() => {
		if (email !== user_email)
			setUpdateEmail(true);
		else
			setUpdateEmail(false);
	}, [email])

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [updatePassword, setUpdatePassword] = useState(false);

	const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	const onPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirm(e.target.value);
	}

	const onPasswordUpdate = () => {
		
	}

	useEffect(() => {
		if (passwordConfirm.length > 0 && password.length > 0)
			setUpdatePassword(true);
		else
			setUpdatePassword(false);
	}, [passwordConfirm])

	return (
		<div className={ AccountStyles.pageContainer } >
			<div className={ AccountStyles.pageContent }>
				<h2>Account</h2>
				<div className={ AccountStyles.formItem }>
					<h1>Username</h1>
					<input value={ username } onChange={ onUsernameChange }/>
					{updateUsername && <div>save username</div>}
				</div>
				<div className={ AccountStyles.formItem }>
					<h1>Email</h1>
					<input type='email' value={ email } onChange={ onEmailChange }/>
					{updateEmail && <div>save email</div>}
				</div>
				<div className={ AccountStyles.formItem }>
					<h1>Change Password</h1>
					<input type='password' placeholder='New Password' value={ password } onChange={ onPasswordChange }/><br/>
					<input type='password' placeholder='Confirm Password' value={ passwordConfirm } onChange={ onPasswordConfirmChange }/>
					{updatePassword && <div>Update Password</div>}
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props>  = async (context: GetServerSidePropsContext) => {
	const supabase = createPagesServerClient(context);

	const {
      data: { user }
   } = await supabase.auth.getUser();

	if (!user) {
		return {
			notFound: true,
		}
	}

	const username = user.user_metadata.username;
	const email = user.email;

	return {
		props: {
			user_name: username,
			user_email: email as string
		}
	}
}

export default Account