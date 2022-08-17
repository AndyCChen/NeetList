
import signInBoxStyles from '../../styles/SignInBox.module.css'

type Props = {
	errorMessage: string,
	setShowError: () => void,
}

const Error = ({ errorMessage, setShowError }: Props) => {
	return (
		<div className={ signInBoxStyles.error }>
			<p>{ errorMessage }</p>
			<button onClick={setShowError}>&times;</button>
		</div>
	)
}

export default Error