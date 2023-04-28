import { CSSProperties, useState, useEffect } from 'react'

import SideBarStyles from '../../styles/SideBar.module.css'

const listSelectorStyle: CSSProperties = {
	backgroundColor: 'white',
	borderRadius: '5px',
}

type Props = {
	listSelectorCallback: (value: string) => void,
}

const SideBar = ({ listSelectorCallback }: Props) => {
	const [listSelector, setListSelector] = useState(0);

	const categories = [
		'All',
		'Watching',
		'Planning',
		'Finished',
		'Droppped',
		'Paused',
	];

	useEffect(() => {
		listSelectorCallback(categories[listSelector]);
	}, [listSelector]);

	const lists = categories.map((value, index) => {
		return (
			<>
				<div style={ listSelector == index ? listSelectorStyle : {} } onClick={() => setListSelector(index)}>
					<p>{ value }</p>
					<p>{ 1 }</p>
				</div>
			</>
		)
	});

	return (
		<div className={ SideBarStyles.sideBar }>
			<p>List</p>
			{ lists }
		</div>
	)
}

export default SideBar