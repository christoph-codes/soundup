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
			{/* <Script src='https://embed.radio.co/player/3d78cbe.js'></Script> */}
		</TemplateMain>
	);
};

export default Listen;

const styles = StyleSheet.create({
	Listen: {},
});
