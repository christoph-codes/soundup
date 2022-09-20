import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	return (
		<TemplateMain style={styles.Home} navigation={navigation} title='Home'>
			<Text>Home Content Goes Here</Text>
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {
		backgroundColor: 'blue',
	},
});
