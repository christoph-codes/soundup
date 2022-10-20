import { createContext, ReactNode, useContext, useState } from 'react';
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';

export interface IAuthContext {
	user: {
		type: 'default' | 'paid' | null;
		name?: string;
		email?: string;
		authId?: string;
	};
	loading: boolean;
	error?: string;
	login: (email: string, password: string) => void;
	logout: () => void;
}

export interface IAuthProviderProps {
	children: ReactNode;
}

export const DefaultContext: IAuthContext = {
	user: {
		type: null,
		name: '',
		email: '',
		authId: '',
	},
	login: () => {},
	logout: () => {},
	loading: false,
};

const AuthContext = createContext<IAuthContext>(DefaultContext);

const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<IAuthContext['user']>(
		DefaultContext['user'],
	);
	const [loading, setLoading] = useState<IAuthContext['loading']>();
	const [error, setError] = useState<IAuthContext['error']>('');
	// Listen for authentication state to change.
	onAuthStateChanged(auth, (fireUser) => {
		if (fireUser != null) {
			console.log('We are authenticated now!');
			// TODO: DB Lookup for user with authid to find additional details not found in firebase
			const authUser: IAuthContext['user'] = {
				authId: fireUser.uid,
				name: fireUser.displayName,
				type: 'default',
				email: fireUser.email,
			};
			setUser(authUser);
			setLoading(false);
		} else {
			setError(
				'There is no user in our database with these credentials.',
			);
		}
	});
	const login = (email: string, password: string) => {
		if (!email || !password) {
			throw new Error(
				'You must complete all fields to properly access your account',
			);
		}
		console.log('logging in user');
		// TODO: Add login function with firebase for username and password
		signInWithEmailAndPassword(auth, email, password).then((data) => {
			console.log('data', data);
			if (data.user) {
				setUser({
					authId: data.user.uid,
					name: data.user.displayName,
					type: 'default',
					email: data.user.email,
				});
			}
		});
	};
	const logout = () => {
		signOut(auth).then(() => setUser(DefaultContext['user']));
	};
	console.log('user:', user);
	return (
		<AuthContext.Provider value={{ user, loading, login, logout, error }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;