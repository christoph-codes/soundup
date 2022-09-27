import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import TemplateMain from '../templates/TemplateMain';

const Watch = ({ navigation }) => {
	const testArticle: IVideoArticleContent = {
		title: 'Test article',
		postedDate: Date.now(),
		link: 'Home',
		videoUrl: 'https://www.youtube.com/watch?v=NmaM5VsZCJM',
	};
	return (
		<TemplateMain
			style={styles.Watch}
			title='Watch'
			navigation={navigation}
		>
			<Text>Watch content goes here</Text>
			<VideoArticle navigation={navigation} article={testArticle} />
		</TemplateMain>
	);
};

export default Watch;

const styles = StyleSheet.create({
	Watch: {
		backgroundColor: 'goldenrod',
	},
});
