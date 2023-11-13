import Image from 'next/legacy/image'
import React from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

import dropMenuStyles from '../../styles/DropMenu.module.css'

type Props = {
	playFadeIn: boolean,
	showDropMenuState: boolean,
}

const DropdownMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const user = useUser();

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