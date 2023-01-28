import { User } from "@supabase/supabase-js";
import { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../utils/supaBase";
import { UserAuthContextInterface } from '../interfaces/userAuthInterface'

const UserAuthContext = createContext<UserAuthContextInterface>({
	user: null,
	isLoading: true,
});

export const useAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (!error) {
				setUser(data.session?.user);
			}
		}

		fetchSession();

		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (!session) setUser(null);
			else if (event == 'SIGNED_IN') setUser(session.user);
			else if (event == 'SIGNED_OUT') setUser(null);
			else if (event == 'USER_UPDATED') console.log('user update')
		});

		setIsLoading(false);

		return () => {
			data.subscription.unsubscribe();
		}
	}, []);

	return (
		<UserAuthContext.Provider value={{ user, isLoading }}>
			{ !isLoading && children }
		</UserAuthContext.Provider>
	)
}