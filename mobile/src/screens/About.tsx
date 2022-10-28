import { StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';
import Link from '../components/Link';
import P from '../components/P';
import TemplateMain from '../templates/TemplateMain';

const About = ({ navigation }) => {
	return (
		<TemplateMain
			title='About The App'
			navigation={navigation}
			style={styles.About}
		>
			<P>Copyright @ 2022. Sound Up Media. All Rights Reserved.</P>
			<P>Version 1.0.0.</P>
			<P>
				Created with ❤️ by{' '}
				<Link link='https://thekirkconcept.com'>The Kirk Concept</Link>
			</P>
		</TemplateMain>
	);
};

const styles = StyleSheet.create({
	About: {},
});

export default About;
