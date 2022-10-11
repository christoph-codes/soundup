import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
	const onAuthStateChanged = (fireUser) => {
		setLoading(true);
		if (fireUser) {
			// TODO: DB Lookup for user with authid to find additional details not found in firebase
			const authUser = {
				authId: fireUser.uid,
				name: fireUser.displayName,
				type: db.user.type,
				email: fireUser.email,
			};
			setUser(authUser);
			setLoading(false);
		} else {
			setError(
				'There is no user in our database with these credentials.',
			);
		}
	};
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	});
	const login = (email: string, password: string) => {
		if (!email || !password) {
			throw new Error(
				'You must complete all fields to properly access your account',
			);
		}
		console.log('logging in user');
		// TODO: Add login function with firebase for username and password
	};
	const logout = () => {
		auth()
			.signOut()
			.then(() => setUser(DefaultContext['user']));
	};
	return (
		<AuthContext.Provider value={{ user, loading, login, logout, error }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
