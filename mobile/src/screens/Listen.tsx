import { StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import TemplateMain from '../templates/TemplateMain';

const Listen = (navigation: NavigationProp<any>) => (
	<TemplateMain
		style={styles.Listen}
		title='Listen'
		navigation={navigation}
		carousel
	>
		{/* <Script src='https://embed.radio.co/player/3d78cbe.js'></Script> */}
	</TemplateMain>
);

export default Listen;

const styles = StyleSheet.create({
	Listen: {},
});
