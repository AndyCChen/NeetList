import React, { useContext, createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { UserInterface, UserAuthContextInterface } from '../interfaces/userInterface'

const UserAuthContext = createContext<UserAuthContextInterface>({
	user: null,
	isloading: true,
	signUp: (email: string, password: string): Promise<UserCredential> => Promise.resolve() as unknown as Promise<UserCredential>,
	signIn: (email: string, password: string): Promise<UserCredential> => Promise.resolve() as unknown as Promise<UserCredential>,
	logout: (): Promise<void> => Promise.resolve(),
});

export const useAuth = () => useContext(UserAuthContext);

export const UserAuthProvider = ({ children }: {children: React.ReactNode}) => {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [isloading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
			if (userCredential) {
				setUser({
					uid: userCredential.uid,
					email: userCredential.email,
				});
			} else {
				setUser(null);
			}

			setLoading(false);

			return () => unsubscribe();
		});
	}, []);

	const signUp = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const signIn = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	}

	const logout = async () => {
		await signOut(auth);
		setUser(null);
	}

	return (
		<UserAuthContext.Provider value={{user, isloading, signUp, signIn, logout}}>
			{!isloading && children}
		</UserAuthContext.Provider>
	)
} 