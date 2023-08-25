import Image from 'next/legacy/image'

import appBarStyles from '../../styles/AppBar.module.css'

type Props = {
	children: React.ReactNode,
	scr: string,
	height: number,
	width: number,
	setState: () => void
}

const NavButton = ({ children, scr, height, width, setState }: Props) => {
	return (
		<>
			<button id='navButton' onClick={setState} className={ appBarStyles.navItem }>
				<Image id='navButton' src={scr} alt='nav icon' height={height} width={width} layout='fixed'/>
			</button>
			{children}
		</>
	)
}

export default NavButton