import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';

const News = ({ navigation }) => {
	return (
		<TemplateMain style={styles.News} title='News' navigation={navigation}>
			<Text>News content goes here</Text>
		</TemplateMain>
	);
};

export default News;

const styles = StyleSheet.create({
	News: {
		backgroundColor: 'red',
		flex: 1,
	},
});
