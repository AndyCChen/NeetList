import { CSSProperties, useState, useEffect } from 'react'
import React from 'react'
import SideBarStyles from '../../styles/SideBar.module.css'

const listSelectorStyle: CSSProperties = {
	backgroundColor: 'white',
	borderRadius: '5px',
}

type ListCount = {
	'All' : number,
	'Watching': number,
	'Planning': number,
	'Finished': number,
	'Dropped': number,
	'Paused': number,
}

type Props = {
	listSelectorCallback: (value: string) => void,
	listCount: ListCount,
}

const SideBar = ({ listSelectorCallback, listCount }: Props) => {
	const [listSelector, setListSelector] = useState(0);

	const categories = [
		'All',
		'Watching',
		'Planning',
		'Finished',
		'Dropped',
		'Paused',
	];

	useEffect(() => {
		listSelectorCallback(categories[listSelector]);
	}, [listSelector]);

	const lists = categories.map((value, index) => {
		if (listCount[value as keyof ListCount] !== 0) {
			return (
				<React.Fragment key={ value }>
					<div style={ listSelector === index ? listSelectorStyle : {} } onClick={ () => setListSelector(index) }>
						<p>{ value }</p>
						<p>{ listCount[value as keyof ListCount] }</p>
					</div>
				</React.Fragment>
			)
		}
	});

	return (
		<div className={ SideBarStyles.sideBar }>
			<p>List</p>
			{ lists }
		</div>
	)
}

export default SideBar