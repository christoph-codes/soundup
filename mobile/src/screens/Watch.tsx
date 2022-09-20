import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';

const Watch = ({ navigation }) => {
	return (
		<TemplateMain
			style={styles.Watch}
			title='Watch'
			navigation={navigation}
		>
			<Text>Watch content goes here</Text>
		</TemplateMain>
	);
};

export default Watch;

const styles = StyleSheet.create({
	Watch: {
		backgroundColor: 'goldenrod',
	},
});
