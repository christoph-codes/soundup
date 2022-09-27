import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import NewsArticle, { IArticleContent } from '../components/NewsArticle';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	const testVideoArticle: IVideoArticleContent = {
		title: 'Test article',
		postedDate: Date.now(),
		link: 'VideoArticle',
		videoUrl: 'NmaM5VsZCJM',
	};
	const testArticle: IArticleContent = {
		title: 'Test article',
		description:
			'This is a test description that will be displayed below the title',
		postedDate: Date.now(),
		link: 'Home',
		imgUrl: 'https://pbs.twimg.com/profile_images/1379078909631717378/xqOL26hn_400x400.jpg',
	};
	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title='Latest Updates'
		>
			<VideoArticle navigation={navigation} article={testVideoArticle} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<NewsArticle article={testArticle} navigation={navigation} />
			<Text>Home Content Goes Here</Text>
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
