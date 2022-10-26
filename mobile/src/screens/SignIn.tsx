import { Text } from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import inputValidations from '../utils/inputValidations';

const SignIn = ({ navigation }) => {
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState('');
	const submitLogin = () => {
		setFormError('');
		if (!email || !password) {
			setFormError('All fields must be provided');
			setPassword('');
		} else if (
			!inputValidations['email'](email) ||
			!inputValidations['password'](password)
		) {
			setFormError('You must enter a valid email and password');
			setPassword('');
		} else {
			login(email, password);
			navigation.navigate('Home');
		}
	};

	return (
		<TemplateMain
			style={styles.SignIn}
			title='SignIn'
			navigation={navigation}
			carousel={[]}
		>
			<Input
				label='Email'
				textContentType='emailAddress'
				value={email.trim().replaceAll(' ', '')}
				setValue={setEmail}
				placeholder='john@doe.com'
				validate={() => inputValidations['email'](email)}
			/>
			<Input
				label='Password'
				value={password.trim().replaceAll(' ', '')}
				secureTextEntry
				setValue={setPassword}
				placeholder='••••••••••'
				validate={() =>
					inputValidations['password'](
						password.trim().replaceAll(' ', ''),
					)
				}
			/>
			{formError && <Text style={styles.SignInError}>{formError}</Text>}
			<Button onPress={() => submitLogin()}>Signin</Button>
			<Button
				variant='ghost'
				onPress={() => navigation.navigate('Create Account')}
			>
				Sign up for an account?
			</Button>
		</TemplateMain>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	SignIn: {
		// backgroundColor: 'pink',
	},
	SignInError: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16,
	},
});
