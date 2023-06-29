import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	createUserWithEmailAndPassword,
	deleteUser,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { log } from '../utils/helper';

export interface IAuthContext {
	/* The user object that will be used in the AuthContext. */
	user: {
		type?: 'default' | 'paid';
		name?: string;
		email?: string;
		authId?: string;
	};
	/* A boolean that is used to determine if the user is loading or not. */
	loading: boolean;
	/* A boolean that determines if there was an error regarding authentication. */
	error?: string;
	/* A function that takes in an email and password, and if they are not empty, it will sign in the
	user with the email and password */
	// eslint-disable-next-line no-unused-vars
	login: (email: string, password: string) => Promise<void>;
	/* A function that takes in a navigation prop to redirect the user and logs the user out. */
	logout: () => void;
	/* Creating a new user function with the given email and password, then adding the user
	to the database. */
	createAccountWithEmailAndPassword: (
		// eslint-disable-next-line no-unused-vars
		name: string,
		// eslint-disable-next-line no-unused-vars
		email: string,
		// eslint-disable-next-line no-unused-vars
		password: string,
	) => void;
	// eslint-disable-next-line no-unused-vars
	deleteAccount: (next: () => void) => void;
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
	login: undefined,
	logout: () => {},
	loading: false,
	createAccountWithEmailAndPassword: () => {},
	deleteAccount: () => {},
};

const AuthContext = createContext<IAuthContext>(DefaultContext);

/**
 * Provides user state to the entire application
 * @param {IAuthProviderProps}  - IAuthProviderProps
 * @returns The AuthProvider is being returned.
 */
const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [user, setUser] = useState<IAuthContext['user']>(DefaultContext.user);
	const [loading, setLoading] = useState<IAuthContext['loading']>();
	const [error, setError] = useState<IAuthContext['error']>('');

	/**
	 * It takes a user id, looks up the user in the database, and returns the user if it exists
	 * @param {string} uid - The user's unique ID from the authentication provider.
	 * @returns The user object is being returned.
	 */
	const lookupUser = async (uid: string) => {
		const userRef = collection(db, 'users');
		const storedUser = query(userRef, where('authId', '==', uid));
		const userGetter = await getDocs(storedUser);
		if (userGetter.empty) {
			setUser(DefaultContext.user);
		} else {
			userGetter.forEach((fbdoc) => {
				setUser(fbdoc.data());
			});
		}
	};

	/* Checking to see if the user is authenticated. If they are, it will set the user to the
	authenticated user. If not, it will set the error to the error message. */
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (fireUser) => {
			if (fireUser != null) {
				await lookupUser(fireUser.uid);
			} else {
				setError(
					'There is no user in our database with these credentials.',
				);
			}
			setLoading(false);
		});
		return () => {
			auth.currentUser?.getIdToken();
			unsubscribe();
		};
	}, []);

	/**
	 * The login function takes in an email and password, and if they are not empty,
	 * it will sign in the user with the email and password
	 * @param {string} email - string - The email address of the user
	 * @param {string} password - string - The password of the user
	 */
	const login = async (email: string, password: string) => {
		if (!email || !password) {
			throw new Error(
				'You must complete all fields to properly access your account',
			);
		}
		try {
			await signInWithEmailAndPassword(auth, email, password)
				.then(async (data) => {
					if (data.user) {
						await lookupUser(data.user.uid);
					}
				})
				.catch((err) => {
					log('login error', err);
					if (err.code === 'auth/wrong-password') {
						throw new Error(
							'You have entered incorrect email and password. Try again',
						);
					}
					throw new Error(err.message);
				});
		} catch (err) {
			throw new Error(err.message);
		}
	};
	/**
	 * It logs the current user out
	 * @param next - A function that fires upon successful logout
	 */
	const logout = () => {
		signOut(auth)
			.then(() => {
				setUser(DefaultContext.user);
			})
			.catch((err) => {
				throw new Error(err);
			});
	};
	/**
	 * It creates an auth user with the given email and password, then adds the user to the database
	 * @param {string} name - string,
	 * @param {string} email - string,
	 * @param {string} password - string
	 */
	const createAccountWithEmailAndPassword = async (
		name: string,
		email: string,
		password: string,
	) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (data) => {
				if (data.user) {
					// Create a user in the database using the authid and email
					await setDoc(doc(db, 'users', data.user.uid), {
						authId: data.user.uid,
						name,
						type: 'default',
						email: data.user.email,
					})
						.then(() => {
							setUser({
								authId: data.user.uid,
								name,
								type: 'default',
								email: data.user.email,
							});
						})
						.catch((err) => {
							throw new Error(err);
						});
				}
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.warn('err:', err));
	};
	const deleteAccount = (next: () => void) => {
		const firebaseUser = auth.currentUser;
		deleteDoc(doc(db, 'users', user.authId))
			.then(() => {
				deleteUser(firebaseUser)
					.then(() => {
						logout();
						next();
					})
					.catch((deleteAccountError) => {
						// An error ocurred
						throw new Error(deleteAccountError.message);
					});
			})
			.catch((err) => {
				log('error deleting document:', err);
				throw new Error(err);
			});
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
				deleteAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

/**
 * It returns the value of the AuthContext Provider
 */
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
