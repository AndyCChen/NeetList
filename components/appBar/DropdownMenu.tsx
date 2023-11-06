import Image from 'next/legacy/image'
import React from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

import dropMenuStyles from '../../styles/DropMenu.module.css'

type Props = {
	playFadeIn: boolean,
	showDropMenuState: boolean,
}

const DropdownMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const router = useRouter();
	const user = useUser();

	const routeToAnimeList = () => {
		router.push(`/animelist/${encodeURIComponent(user?.user_metadata.username)}`);
	}

	return (
		<>
			{props.showDropMenuState &&
				<div ref={ref} className={ `${dropMenuStyles.menuContainer} ${props.playFadeIn ? dropMenuStyles.openModal : dropMenuStyles.closeModal}`}>
					<div className={ dropMenuStyles.menuHead }>
						<div className={ dropMenuStyles.userIcon}>
							<Image src='/user.svg' alt='user icon' height={50} width={50} layout='intrinsic'/>
						</div>
						<p>{ user?.user_metadata.username }</p>
					</div>
					<button className={ dropMenuStyles.menuButton}>
						<p>Profile</p>
					</button>
					<button className={ dropMenuStyles.menuButton} onClick={routeToAnimeList}>
						<p>Anime List</p>
					</button>
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