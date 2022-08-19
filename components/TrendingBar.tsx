import TrendingBarStyles from '../styles/TrendingBar.module.css'


type Props = {
	children: React.ReactNode,
}

const TrendingBar = ({ children }: Props) => {
	return (
		<div className={ TrendingBarStyles.trendingBarContainer }>
			{ children }
		</div>
	)
}

export default TrendingBar