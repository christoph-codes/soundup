import { Text } from 'native-base';
import { updateEmail, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { NavigationProp, Route } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import Button from '../components/Button';
import ErrorText from '../components/ErrorText';
import HR from '../components/HR';
import Input from '../components/Input';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import inputValidations from '../utils/inputValidations';
import Modal from '../components/Modal';
import { log } from '../utils/helper';
import AuthWrapper from '../components/AuthWrapper';

export interface IAccountSettings {
	navigation: NavigationProp<any>;
	route: Route<any, any>;
}

const AccountSettings = ({ navigation, route }: IAccountSettings) => {
	const { user, logout, deleteAccount } = useAuth();
	const [email, setEmail] = useState(route?.params?.newEmail || user.email);
	const [successMessage, setSuccessMessage] = useState('');
	const [emailError, setEmailError] = useState('');
	const [newPassword, setNewPassword] = useState(
		route?.params?.newPassword || '',
	);
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const updateUserEmail = () => {
		setEmailError('');
		if (!email) {
			setEmailError('You must provide a valid email');
			return;
		}
		if (email === user.email) {
			setEmailError('This is your current email. You are good to go!');
			return;
		}
		if (!inputValidations.email(email)) {
			setEmailError('You must enter a valid email and password');
			setEmail('');
			return;
		}

		updateEmail(auth.currentUser, email)
			.then(async () => {
				await updateDoc(doc(db, 'users', user.authId), {
					email,
				})
					.then(() => {
						setSuccessMessage('Email Successfully Updated');
					})
					.catch((err) => {
						setEmailError(err.message);
					});
			})
			.catch((err) => {
				log('err:', err);
				if (err.message === 'Firebase: Error (auth/invalid-email).') {
					setEmailError('You must enter a valid email and password');
				} else if (
					err.message ===
					'Firebase: Error (auth/requires-recent-login).'
				) {
					navigation.navigate('Reauth', {
						newEmail: email,
					});
				}
			});
	};
	const updateUserPassword = () => {
		setPasswordError('');
		if (!newPassword || !confirmNewPassword) {
			setPasswordError(
				'You must enter current password and new password to update',
			);
			return;
		}
		if (newPassword !== confirmNewPassword) {
			setPasswordError('Passwords do not match');
			return;
		}
		const loggedInUser = auth.currentUser;
		updatePassword(loggedInUser, newPassword)
			.then(() => {
				setSuccessMessage('Password Successfully Updated');
			})
			.catch((err) => {
				if (
					err.message ===
					'Firebase: Error (auth/requires-recent-login).'
				) {
					navigation.navigate('Reauth', {
						newPassword,
					});
				}
			});
	};
	const openModal = () => {
		deleteAccount(() => navigation.navigate('Sign In'));
	};
	const signOutUser = () => {
		logout();
		navigation.navigate('Sign In');
	};
	return (
		<AuthWrapper navigation={navigation}>
			<TemplateMain
				style={styles.AccountSettings}
				title='Settings'
				carousel={[]}
				navigation={navigation}
			>
				{successMessage && (
					<Text style={styles.SuccessMessage}>{successMessage}</Text>
				)}
				<Input value={email} setValue={setEmail} label='Email' />
				{emailError && <ErrorText>{emailError}</ErrorText>}
				<Button
					style={[styles.UpdateButton]}
					onPress={() => updateUserEmail()}
				>
					Update Email
				</Button>
				<Input
					value={newPassword}
					setValue={setNewPassword}
					label='New Password'
					placeholder='••••••••••'
					secureTextEntry
					validate={() =>
						inputValidations.password(
							newPassword.trim().replaceAll(' ', ''),
						)
					}
					helperText='Minimum eight characters. At least one upper case English letter. One lower case English letter. One number and one special character.'
				/>
				<Input
					value={confirmNewPassword}
					setValue={setConfirmNewPassword}
					label='Confirm New Password'
					placeholder='••••••••••'
					secureTextEntry
				/>
				{passwordError && <ErrorText>{passwordError}</ErrorText>}
				<Button
					style={[styles.UpdateButton]}
					onPress={() => updateUserPassword()}
				>
					Update Password
				</Button>
				<HR />
				<Button onPress={() => signOutUser()} variant='ghost'>
					✌🏾 Log Out
				</Button>
				<Button
					onPress={() => navigation.navigate('About')}
					variant='ghost'
				>
					About the App
				</Button>
				<HR />
				<Modal
					buttonLabel='Delete Account'
					successCallback={openModal}
					message="By tapping 'Delete' you will lose access to your Soundup Media account and will have to reregister to gain access to all account features."
					title='Are You Sure?'
					successLabel='Delete'
					buttonVariant='alert'
				/>
			</TemplateMain>
		</AuthWrapper>
	);
};

export default AccountSettings;

const styles = StyleSheet.create({
	AccountSettings: {},
	SuccessMessage: {
		color: '#8DE9FE',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16,
	},
	SettingsError: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16,
	},
	UpdateButton: {
		marginBottom: 40,
	},
});
