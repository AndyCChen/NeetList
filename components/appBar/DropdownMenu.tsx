import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

import dropMenuStyles from '../../styles/DropMenu.module.css'
import { Profile } from '../../interfaces/profile';

type Props = {
	playFadeIn: boolean,
	showDropMenuState: boolean,
}

const DropdownMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const user = useUser();

	const [username, setUsername] = useState<string | null>('');
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

	useEffect(() => {
		// fetch user profiles on mount
		if (user) {
			fetch(`/api/profile/${user.id}`)
				.then((res) => res.json())
				.then((data: Profile) => {
					if (!data.error && data.data && data.data[0]) {
						setUsername(data.data[0].username);
						setAvatarUrl(data.data[0].avatar_url);
					}
				});
		}
	}, [])

	return (
		<>
			{props.showDropMenuState &&
				<div ref={ref} className={ `${dropMenuStyles.menuContainer} ${props.playFadeIn ? dropMenuStyles.openModal : dropMenuStyles.closeModal}`}>
					<div className={ dropMenuStyles.menuHead }>
						<div className={ dropMenuStyles.userIcon}>
							<Image 
								style={{ borderRadius: '50%' }}
								src={ avatarUrl ? avatarUrl : '/user.svg' }
							   alt='user icon' 
								height={50} 
								width={50} 
								layout='intrinsic'
							/>
						</div>
						<p>{ username ? username : '' }</p>
					</div>
					<Link className={ dropMenuStyles.menuButton} href={ `/account`}>
						<p>Account</p>
					</Link>
					<Link className={ dropMenuStyles.menuButton} href={ `/animeList` }>
						<p>Anime List</p>
					</Link>
					<form action="/api/auth/logout" method="post">
						<button className={ dropMenuStyles.menuButton}>
							<p>Logout</p>
						</button>
					</form>
				</div>
			}
		</>
		
	)
})

// display name
DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu