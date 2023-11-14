import React, { useEffect, useRef, useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import AccountStyles from '../../styles/AccountPage.module.css'

type Props = {
	user_name: string,
	user_email: string,
}

const Account: NextPage<Props> = ({ user_name, user_email }) => {
	const supabaseClient = useSupabaseClient();
	
	const [username, setUsername] = useState(user_name);
	const previous_username = useRef(user_name);
	const [updateUsername, setUpdateUsername] = useState(false);

	const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	}

	const onUsernameUpdate = async () => {
		const { data, error } = await supabaseClient.auth.updateUser({
			data: {
				username: username,
			}
		});

		if (error) {
			alert(error.message);
		}
		else {
			alert('Username Updated');
			previous_username.current = username;
			setUpdateUsername(false);
		}
	}

	useEffect(() => {
		if (username !== previous_username.current)
			setUpdateUsername(true);
		else
			setUpdateUsername(false);
	}, [username])

	const [email, setEmail] = useState(user_email);
	const previous_email = useRef(user_email);
	const [updateEmail, setUpdateEmail] = useState(false);

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const onEmailUpdate = async (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { data, error } = await supabaseClient.auth.updateUser({
			email: email
		});

		if (error) {
			alert(error.message);
		} else {
			alert('Email Update Confirmation Sent!');
			previous_email.current = email;
			setUpdateEmail(false);
		}
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

	const onPasswordUpdate = async (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			alert('Passwords do not match!');
			return;
		} 

		const { data, error } = await supabaseClient.auth.updateUser({
			password: password
		});

		if (error) {
			alert(error.message);
		} else {
			alert('Password Updated')
			setPassword('');
			setPasswordConfirm('');
			setUpdatePassword(false);
		}
	}

	useEffect(() => {
		if (passwordConfirm.length > 0 && password.length > 0)
			setUpdatePassword(true);
		else
			setUpdatePassword(false);
	}, [passwordConfirm, password])

	return (
		<div className={ AccountStyles.pageContainer } >
			<div className={ AccountStyles.pageContent }>
				<h2>Account</h2>
				<div className={ AccountStyles.formItem } onSubmit={ onUsernameUpdate }>
					<h1>Username</h1>
					<input value={ username } onChange={ onUsernameChange }/>
					{
						updateUsername && 
						<button className={ AccountStyles.saveButton } onClick={ onUsernameUpdate }>
							Save Username
						</button>
					}
				</div>
				<form className={ AccountStyles.formItem } onSubmit={ onEmailUpdate }>
					<h1>Email</h1>
					<input type='email' value={ email } onChange={ onEmailChange }/>
					{
						updateEmail && 
						<button type='submit' className={ AccountStyles.saveButton }>
							Save Email
						</button>
					}
				</form>
				<form className={ AccountStyles.formItem } onSubmit={ onPasswordUpdate }>
					<h1>Change Password</h1>
					<input type='password' placeholder='New Password' value={ password } onChange={ onPasswordChange }/><br/>
					<input type='password' placeholder='Confirm Password' value={ passwordConfirm } onChange={ onPasswordConfirmChange }/>
					{
						updatePassword && 
						<button type= 'submit' className={ AccountStyles.saveButton }>
							Save Password
						</button>
					}
				</form>
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