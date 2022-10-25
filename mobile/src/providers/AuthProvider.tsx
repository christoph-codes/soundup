import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';

export interface IAuthContext {
	user: {
		type?: 'default' | 'paid';
		name?: string;
		email?: string;
		authId?: string;
	};
	loading: boolean;
	error?: string;
	login: (email: string, password: string) => void;
	logout: (navigation: NavigationProp<any>) => void;
	createAccountWithEmailAndPassword: (
		name: string,
		email: string,
		password: string,
	) => void;
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
	createAccountWithEmailAndPassword: () => {},
};

const AuthContext = createContext<IAuthContext>(DefaultContext);

const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<IAuthContext['user']>(
		DefaultContext['user'],
	);
	const [loading, setLoading] = useState<IAuthContext['loading']>();
	const [error, setError] = useState<IAuthContext['error']>('');
	console.log('user:', user);

	const lookupUser = async (uid: string): Promise<IAuthContext['user']> => {
		const userRef = collection(db, 'users');
		const storedUser = query(userRef, where('authId', '==', uid));
		const userGetter = await getDocs(storedUser);
		if (userGetter.empty) {
			return null;
		} else {
			userGetter.forEach((doc) => {
				if (doc.exists) {
					return doc.data();
				}
				return null;
			});
		}
	};

	// Listen for authentication state to change.
	useEffect(() => {
		onAuthStateChanged(auth, async (fireUser) => {
			if (fireUser != null) {
				console.log('We are authenticated now!');
				const authenticatedUser = await lookupUser(fireUser.uid);
				console.log('authUser:', authenticatedUser);
				if (!authenticatedUser) {
					setUser(authenticatedUser);
				}
				setLoading(false);
			} else {
				setError(
					'There is no user in our database with these credentials.',
				);
			}
		});
	}, []);

	const login = (email: string, password: string) => {
		if (!email || !password) {
			throw new Error(
				'You must complete all fields to properly access your account',
			);
		}
		console.log('logging in user');
		// TODO: Add login function with firebase for username and password
		signInWithEmailAndPassword(auth, email, password).then(async (data) => {
			if (data.user) {
				const authenticatedUser = await lookupUser(data.user.uid);
				if (authenticatedUser !== null) {
					setUser(authenticatedUser);
				}
			}
		});
	};
	const logout = (navigation: NavigationProp<any>) => {
		signOut(auth)
			.then(() => {
				setUser(DefaultContext['user']);
				navigation.navigate('Sign In');
			})
			.catch((err) => {
				throw new Error(err);
			});
	};
	const createAccountWithEmailAndPassword = async (
		name: string,
		email: string,
		password: string,
	) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (data) => {
				console.log('create data:', data.user);
				if (data.user) {
					// Create a user in the database using the authid and email
					await addDoc(collection(db, 'users'), {
						authId: data.user.uid,
						name: name,
						type: 'default',
						email: data.user.email,
					})
						.then((res) => {
							console.log('successful user addition', res);
							setUser({
								authId: data.user.uid,
								name: name,
								type: 'default',
								email: data.user.email,
							});
						})
						.catch((err) => {
							throw new Error(err);
						});
				}
			})
			.catch((err) => console.log('err:', err));
	};
	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				logout,
				error,
				createAccountWithEmailAndPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
