import { CSSProperties, useState, useEffect } from 'react'

import SideBarStyles from '../../styles/SideBar.module.css'

const listSelectorStyle: CSSProperties = {
	backgroundColor: 'white',
	borderRadius: '5px',
}

const SideBar = () => {

	const [listSelector, setListSelector] = useState(1);

	useEffect(() => {
		console.log(listSelector)
	}, [listSelector]);

	return (
		<div className={ SideBarStyles.sideBar }>
			<p>List</p>
			<div style={ listSelector == 1 ? listSelectorStyle : {} } onClick={() => setListSelector(1)}>
				<p>All</p>
				<p>{ 1 }</p>
			</div>
			<div style={ listSelector == 2 ? listSelectorStyle : {} } onClick={() => setListSelector(2)}>
				<p>Watching</p>
				<p>{ 1 }</p>
			</div>
			<div style={ listSelector == 3 ? listSelectorStyle : {} } onClick={() => setListSelector(3)}>
				<p>Planning</p>
				<p>{ 1 }</p>
			</div>
			<div style={ listSelector == 4 ? listSelectorStyle : {} } onClick={() => setListSelector(4)}>
				<p>Finished</p>
				<p>{ 1 }</p>
			</div>
			<div style={ listSelector == 5 ? listSelectorStyle : {} } onClick={() => setListSelector(5)}>
				<p>Dropped</p>
				<p>{ 1 }</p>
			</div>
			<div style={ listSelector == 6 ? listSelectorStyle : {} }  onClick={() => setListSelector(6)}>
				<p>Paused</p>
				<p>{ 1 }</p>
			</div>
		</div>
	)
}

export default SideBar