import React, { useState } from 'react'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { Database } from '../../interfaces/supabase';

import AccountStyles from '../../styles/AccountPage.module.css'

type Props = {
	user_name: string | null,
	user_email: string,
	avatar_url: string | null,
}

const Account: NextPage<Props> = ({ user_name, user_email, avatar_url }) => {
	const supabaseClient = useSupabaseClient<Database>();
	
	const user = useUser();

	const [username, setUsername] = useState(user_name);
	const [prevUsername, setPrevUsername] = useState(user_name);
	let updateUsername: boolean = false;

	const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	}

	const onUsernameUpdate = async () => {
		const { error } = await supabaseClient.auth.updateUser({
			data: {
				username: username,
			}
		});

		const { error: updateUsernameError } = await supabaseClient
			.from('profiles')
			.upsert(
				{
					username: username
				},
				{
					onConflict: 'id'
				}
			)
			.select();

		if (error || updateUsernameError) {
			alert('An error occured!');
			console.log(error?.message);
			console.log(updateUsernameError?.message);
		}
		else {
			alert('Username Updated');
			setPrevUsername(username);
		}
	}

	if (username !== prevUsername)
		updateUsername = true;

	const [email, setEmail] = useState(user_email);
	const [prevEmail, setPrevEmail] = useState(user_email);
	let updateEmail: boolean = false;

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const onEmailUpdate = async (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email.length === 0) {
			alert("Please fill out your email!");
			return;
		}

		const { data, error } = await supabaseClient.auth.updateUser({
			email: email
		});

		if (error) {
			alert(error.message);
		} else {
			alert('Email Update Confirmation Sent!');
			setPrevEmail(email);
		}
	}

	if (email !== prevEmail)
		updateEmail = true;

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	let updatePassword = false;

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
		}
	}

	if (passwordConfirm.length > 0 && password.length > 0)
		updatePassword = true;

	const [avatarURL, setAvatarURL] = useState<string | null>(avatar_url);

	const uploadImage = async (file: File) => {
		if (!user) {
			alert('Please log in first!');
			return;
		}

		// get avatar url from database
		const { data, error: fetchImageError } = await supabaseClient
			.from('profiles')
			.select()
			.match({
				'id' : user.id
			});

		// abort on error
		if (fetchImageError) {
			alert(fetchImageError.message);
			return;
		}

		// if user has existing avatar image, delete it from storage bucket
		if (data[0].avatar_url) {
			const imageName = new URL(data[0].avatar_url).pathname.split('/').pop();

			// delete image from bucket
			const {data: fileList, error: listError } = await supabaseClient
				.storage
				.from('avatar-images')
				.remove([`${user.id}/${imageName}`]);

			if (listError) {
				alert(listError.message);
				return;
			}
		}

		// path for newly upload avatar image
		const path = `${user.id}/${file.name}`;

		const { error } = await supabaseClient
			.storage
			.from('avatar-images')
			.upload(path, file);

		if (error) {
			alert(error.message);
			return;
		} 

		const publicURL = supabaseClient.storage.from('avatar-images').getPublicUrl(path).data.publicUrl;

		// write public url of new avatar image into profiles table in database
		const { error: updateAvatarUrlError } = await supabaseClient
			.from('profiles')
			.upsert(
				{ avatar_url: publicURL }, { onConflict: 'id' }
			)
			.select();

		if (updateAvatarUrlError) {
			alert(updateAvatarUrlError.message);
			return;
		}

		await supabaseClient
			.auth
			.updateUser({
				data: {
					avatarURL: publicURL
				}
			});

		setAvatarURL(publicURL);
		alert('Image uploaded!');
	}

	const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files) {
			alert('File upload failed');
			return;
		}

		const allowedFiles = [
			'image/png',
			'image/jpeg'
		];

		// do not allow files that are not .png or .jpeg
		if (e.currentTarget.files[0].type == undefined || !allowedFiles.includes(e.currentTarget.files[0].type)) {
			alert('Invalid file type!');
			return;
		}

		uploadImage(e.currentTarget.files[0]);
	}

	const onImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();

		const allowedFiles = [
			'image/png',
			'image/jpeg'
		];

		// do not allow files that are not .png or .jpeg
		if (event.dataTransfer.files[0].type == undefined || !allowedFiles.includes(event.dataTransfer.files[0].type)) {
			alert('Invalid file type!');
			return;
		}

		const file = event.dataTransfer.files[0];
		uploadImage(file);
	}

	const onImageDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		
		// disable file upload if user tries to upload more than 1 file
		if (event.dataTransfer.items.length !== 1) {
			event.dataTransfer.dropEffect = 'none';
		}
	}

	return (
		<div className={ AccountStyles.pageContainer } >
			<div className={ AccountStyles.pageContent }>
				<h2>Account</h2>
				<div className={ AccountStyles.imageForm }>
					<h1>Avatar</h1>
					<div className={ AccountStyles.imageUploadContainer }>
						<label className={ AccountStyles.imageInput } onDrop={ onImageDrop } onDragOver={ onImageDragOver }>
							Drag image here or click to upload
							<input
								id='avatar-image'
								type='file'
								accept='image/png, image/jpeg'
								placeholder='Drop image here or click to upload'
								onChange={ onImageUpload }
							/>
						</label>
							<Image
								className={ AccountStyles.imageContainer }
								draggable={ false }
								src={ avatarURL ? avatarURL : '/user.svg' }
								width={230}
								height={230} 
								alt='Avatar image'
							/>
					</div>
				</div>
				<div className={ AccountStyles.formItem }>
					<h1>Username</h1>
					<input id='username' value={ username ? username : '' } onChange={ onUsernameChange } autoComplete='off'/>
					{
						updateUsername && 
						<button className={ AccountStyles.saveButton } onClick={ onUsernameUpdate }>
							Save Username
						</button>
					}
				</div>
				<form name='email-form' className={ AccountStyles.formItem } onSubmit={ onEmailUpdate }>
					<h1>Email</h1>
					<input id='email' type='email' value={ email } onChange={ onEmailChange } autoComplete='off'/>
					{
						updateEmail && 
						<button type='submit' className={ AccountStyles.saveButton }>
							Save Email
						</button>
					}
				</form>
				<form className={ AccountStyles.formItem } onSubmit={ onPasswordUpdate }>
					<h1>Change Password</h1>
					<input id='password' type='password' placeholder='New Password' value={ password } onChange={ onPasswordChange }/><br/>
					<input id='confirm-password' type='password' placeholder='Confirm Password' value={ passwordConfirm } onChange={ onPasswordConfirmChange }/>
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
	const supabase = createPagesServerClient<Database>(context);

	const {
      data: { user }
   } = await supabase.auth.getUser();

	if (!user) {
		return {
			notFound: true,
		}
	}

	const { data, error } = await supabase
		.from('profiles')
		.select('username, avatar_url')
		.eq('id', user.id);

	if (error) {
		return {
			notFound: true,
		}
	}

	const username = data[0].username;
	const email = user.email;
	const avatarUrl = data[0].avatar_url;

	return {
		props: {
			user_name: username,
			user_email: email as string,
			avatar_url: avatarUrl,
		}
	}
}

export default Account