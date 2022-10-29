import { useState } from 'react';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import inputValidations from '../utils/inputValidations';
import P from '../components/P';

const Reauth = ({ navigation, route }) => {
	const { login, user } = useAuth();
	const [email, setEmail] = useState(user.email || '');
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
			if (route.params.newEmail) {
				navigation.navigate('Account Settings', {
					newEmail: route.params.newEmail,
				});
			} else if (route.params.newPassword) {
				navigation.navigate('Account Settings', {
					newPassword: route.params.newPassword,
				});
			} else {
				navigation.navigate('Home');
			}
		}
	};

	return (
		<TemplateMain
			style={styles.Reauth}
			title='Secure Sign In'
			navigation={navigation}
			carousel={[]}
		>
			<P>
				To keep your account secure, we require you to login before
				performing this action.
			</P>
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
			{formError && <Text style={styles.ReauthError}>{formError}</Text>}
			<Button onPress={() => submitLogin()}>Sign In</Button>
		</TemplateMain>
	);
};

export default Reauth;

const styles = StyleSheet.create({
	Reauth: {
		// backgroundColor: 'pink',
	},
	ReauthError: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 16,
	},
});
