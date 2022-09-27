import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import TemplateMain from '../templates/TemplateMain';

const Watch = ({ navigation }) => {
	const testArticle: IVideoArticleContent = {
		title: 'Test article',
		postedDate: Date.now(),
		link: 'Home',
		videoUrl: 'NmaM5VsZCJM',
	};
	return (
		<TemplateMain
			style={styles.Watch}
			title='Watch'
			navigation={navigation}
		>
			<VideoArticle navigation={navigation} article={testArticle} />
			<VideoArticle navigation={navigation} article={testArticle} />
			<VideoArticle navigation={navigation} article={testArticle} />
			<VideoArticle navigation={navigation} article={testArticle} />
		</TemplateMain>
	);
};

const styles = StyleSheet.create({
	Watch: {},
});

export default Watch;
