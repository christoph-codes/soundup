import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';

const SignIn = ({ navigation }) => {
	return (
		<TemplateMain
			style={styles.SignIn}
			title='SignIn'
			navigation={navigation}
		>
			<Text>SignIn content goes here</Text>
		</TemplateMain>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	SignIn: {
		backgroundColor: 'pink',
	},
});
