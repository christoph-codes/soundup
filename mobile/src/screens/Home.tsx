import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import NewsArticle, { IArticleContent } from '../components/NewsArticle';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import contentful from '../utils/contentful';

const Home = ({ navigation }) => {
	const { user } = useAuth();
	const testVideoArticle: IVideoArticleContent = {
		title: 'Test article',
		postedDate: Date.now(),
		link: 'Home',
		videoUrl: 'NmaM5VsZCJM',
	};
	useEffect(() => {
		contentful
			.get('')
			.then((res) => {
				setPosts(res.data);
			})
			.catch(console.log);
	}, []);
	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
			carousel
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
