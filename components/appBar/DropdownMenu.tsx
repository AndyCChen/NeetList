import Image from 'next/image'

import dropMenuStyles from '../../styles/DropMenu.module.css'

type Props = {
	playFadeIn: boolean,
	showDropMenuState: boolean,
}

const DropdownMenu = ({ playFadeIn ,showDropMenuState }: Props) => {
	return (
		<>
			{showDropMenuState &&
				<div className={ `${dropMenuStyles.menuContainer} ${playFadeIn ? dropMenuStyles.openModal : dropMenuStyles.closeModal}`}>
					<div className={ dropMenuStyles.menuHead }>
						<div className={ dropMenuStyles.userIcon}>
							<Image src='/user.svg' alt='user icon' height={50} width={50} layout='intrinsic'/>
						</div>
						<p>NonAnimeWatcher</p>
					</div>

					<button className={ dropMenuStyles.menuButton}>
						<p>Profile</p>
					</button>

					<button className={ dropMenuStyles.menuButton}>
						<p>Friends</p>
					</button>

					<button className={ dropMenuStyles.menuButton}>
						<p>Settings</p>
					</button>

					<button className={ dropMenuStyles.menuButton}>
						<p>Logout</p>
					</button>
				</div>
			}
		</>
		
	)
}

export default DropdownMenu