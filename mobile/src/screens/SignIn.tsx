import { Text } from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import TemplateMain from '../templates/TemplateMain';

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formError, setFormError] = useState('');
	// TODO: Create helper function that takes in regex and tests the value next to it
	const validateEmail = (): boolean => {
		const regex = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');
		const isValid = regex.test(email);
		console.log('isValid Email', isValid);
		return isValid;
	};
	const validatePassword = (): boolean => {
		const regex = new RegExp(
			'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
		);
		const isValid = regex.test(password);
		console.log('isValid password', isValid);
		return isValid;
	};
	const submitLogin = () => {
		setFormError('');
		if (!email || !password) {
			setFormError('All fields must be provided');
			setPassword('');
		} else if (!validatePassword() || !validateEmail()) {
			setFormError('You must enter a valid email and password');
			setPassword('');
		} else {
			console.log('creds:', { email, password });
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
				validate={() => validateEmail()}
			/>
			<Input
				label='Password'
				value={password.trim().replaceAll(' ', '')}
				secureTextEntry
				setValue={setPassword}
				placeholder='••••••••••'
				validate={() => validatePassword()}
				helperText='Minimum eight characters. At least one upper case English letter. One lower case English letter. One number and one special character.'
			/>
			{formError && <Text style={styles.SignInError}>{formError}</Text>}
			<Button onPress={() => submitLogin()}>Signin</Button>
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
