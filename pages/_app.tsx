import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps<{initialSession: Session}>) {
	const [supabaseClient] = useState(() => createPagesBrowserClient());

	return (
		<SessionContextProvider
			supabaseClient={ supabaseClient }
			initialSession={ pageProps.initialSession }
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionContextProvider>
	)
}

export default MyApp
