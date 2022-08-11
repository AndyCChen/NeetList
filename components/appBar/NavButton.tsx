import Image from 'next/image'

import appBarStyles from '../../styles/AppBar.module.css'

type Props = {
	scr: string,
	height: number,
	width: number,
	setState: () => void
}

const NavButton = ({ scr, height, width, setState }: Props) => {
	return (
		<button onClick={setState} className={ appBarStyles.navItem }>
			<Image src={scr} alt='nav icon' height={height} width={width} layout='fixed'/>
		</button>
	)
}

export default NavButton