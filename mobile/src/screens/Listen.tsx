import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import TemplateMain from '../templates/TemplateMain';
import Loading from '../components/Loading';

const Listen = ({ navigation }) => {
	return (
		<TemplateMain
			style={styles.Listen}
			title='Listen'
			navigation={navigation}
			carousel
		>
			<Loading />
		</TemplateMain>
	);
};

export default Listen;

const styles = StyleSheet.create({
	Listen: {},
});
