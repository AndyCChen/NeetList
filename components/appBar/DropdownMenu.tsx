import Image from 'next/image'
import React, { useEffect } from 'react'
import { supabase } from '../../utils/supaBase'
import { useAuth } from '../../context/UserAuthProvider'

import dropMenuStyles from '../../styles/DropMenu.module.css'

type Props = {
	playFadeIn: boolean,
	showDropMenuState: boolean,
}

const DropdownMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {

	const logout = async () => {
		await supabase.auth.signOut();
	}

	const { user } = useAuth();

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

					<button className={ dropMenuStyles.menuButton}>
						<p>Watch List</p>
					</button>

					<button className={ dropMenuStyles.menuButton} onClick={logout}>
						<p>Logout</p>
					</button>
				</div>
			}
		</>
		
	)
})

// display name
DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu