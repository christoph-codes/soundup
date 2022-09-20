import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';

const Listen = ({ navigation }) => {
	return (
		<TemplateMain
			style={styles.Listen}
			title='Listen'
			navigation={navigation}
		>
			<Text>Listen content goes here</Text>
		</TemplateMain>
	);
};

export default Listen;

const styles = StyleSheet.create({
	Listen: {
		backgroundColor: 'green',
	},
});
