import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { UserAuthProvider } from '../context/UserAuthContext'

import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
		return (
			<UserAuthProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</UserAuthProvider>
		)

}

export default MyApp
