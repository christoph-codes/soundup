import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';

const AccountSettings = ({ navigation }) => {
	return (
		<TemplateMain
			style={styles.AccountSettings}
			title='Account Settings'
			navigation={navigation}
		>
			<Text>Account Settings content goes here</Text>
		</TemplateMain>
	);
};

export default AccountSettings;

const styles = StyleSheet.create({
	AccountSettings: {
		backgroundColor: 'orange',
	},
});
