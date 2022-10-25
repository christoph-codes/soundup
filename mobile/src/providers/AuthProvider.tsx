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
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

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
	// Listen for authentication state to change.
	useEffect(() => {
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
	}, []);

	console.log('user:', user);

	const login = (email: string, password: string) => {
		if (!email || !password) {
			throw new Error(
				'You must complete all fields to properly access your account',
			);
		}
		console.log('logging in user');
		// TODO: Add login function with firebase for username and password
		signInWithEmailAndPassword(auth, email, password).then(async (data) => {
			console.log('data', data);
			if (data.user) {
				console.log('in there');
				const docRef = doc(db, 'users');
				const docSnap = await getDoc(docRef);
				if (docSnap.exists) {
					setUser(docSnap.data());
				} else {
					console.log('No user exists');
				}
			}
		});
	};
	const logout = () => {
		signOut(auth).then(() => setUser(DefaultContext['user']));
	};
	const createAccountWithEmailAndPassword = async (
		name: string,
		email: string,
		password: string,
	) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (data) => {
				console.log('data', data.user);
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
