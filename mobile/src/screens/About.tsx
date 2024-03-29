import { StyleSheet } from 'react-native';
import Link from '../components/Link';
import P from '../components/P';
import TemplateMain from '../templates/TemplateMain';
import { INavigationOnly } from '../types/globalTypes';

const About = ({ navigation }: INavigationOnly) => (
	<TemplateMain
		title='About The App'
		navigation={navigation}
		style={styles.About}
	>
		<P>
			Copyright @ {new Date().getFullYear()}. Sound Up Media. All Rights
			Reserved.
		</P>
		<P>Version 1.1.7.</P>
		<P>
			Created with ❤️ by{' '}
			<Link href='https://thekirkconcept.com'>The Kirk Concept</Link>
		</P>
	</TemplateMain>
);

const styles = StyleSheet.create({
	About: {},
});

export default About;
