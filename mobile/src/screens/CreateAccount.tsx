import { Text } from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import inputValidations from '../utils/inputValidations';
import { INavigationOnly } from '../types/globalTypes';
import P from '../components/P';

const CreateAccount = ({ navigation }: INavigationOnly) => {
	const { createAccountWithEmailAndPassword } = useAuth();
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [formError, setFormError] = useState<string>('');

	const submitAccountCreation = () => {
		setFormError('');
		if (!email || !password) {
			setFormError('All fields must be provided');
			setPassword('');
		} else if (
			!inputValidations.email(email) ||
			!inputValidations.password(password)
		) {
			setFormError('You must enter a valid email and password');
			setPassword('');
		} else if (password !== confirmPassword) {
			setFormError('Your passwords should match');
			setPassword('');
			setConfirmPassword('');
		} else {
			createAccountWithEmailAndPassword(name, email, password);
			navigation.navigate('Home');
		}
	};

	return (
		<TemplateMain
			style={styles.CreateAccount}
			title='Create Account'
			navigation={navigation}
			carousel={[]}
		>
			<P>Create an account to access exclusive SoundUp Media content!</P>
			<Input
				label='Name'
				textContentType='name'
				value={name}
				setValue={setName}
				placeholder='John Doe'
				validate={() => inputValidations.notEmpty(name)}
			/>
			<Input
				label='Email'
				textContentType='emailAddress'
				value={email.trim().replaceAll(' ', '')}
				setValue={setEmail}
				placeholder='john@doe.com'
				validate={() => inputValidations.email(email)}
			/>
			<Input
				label='Password'
				value={password.trim().replaceAll(' ', '')}
				secureTextEntry
				setValue={setPassword}
				placeholder='••••••••••'
				validate={() =>
					inputValidations.password(
						password.trim().replaceAll(' ', ''),
					)
				}
				helperText='Minimum eight characters. At least one upper case English letter. One lower case English letter. One number and one special character.'
			/>
			<Input
				label='Confirm Password'
				value={confirmPassword.trim().replaceAll(' ', '')}
				secureTextEntry
				setValue={setConfirmPassword}
				placeholder='••••••••••'
				validate={() =>
					inputValidations.notEmpty(
						confirmPassword.trim().replaceAll(' ', ''),
					)
				}
			/>
			{formError && (
				<Text style={styles.CreateAccountError}>{formError}</Text>
			)}
			<Button onPress={() => submitAccountCreation()}>
				Create Account
			</Button>
			<Button
				variant='ghost'
				onPress={() => navigation.navigate('Sign In')}
			>
				Already have an account?
			</Button>
		</TemplateMain>
	);
};

export default CreateAccount;

const styles = StyleSheet.create({
	CreateAccount: {
		// backgroundColor: 'pink',
	},
	CreateAccountError: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16,
	},
});
