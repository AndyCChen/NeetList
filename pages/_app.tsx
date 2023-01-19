import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useUser } from '../hooks/useUser'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

	const { isLoading } = useUser();

	return (
			!isLoading &&
			<Layout>
				<Component {...pageProps} />
			</Layout>
	)

}

export default MyApp
