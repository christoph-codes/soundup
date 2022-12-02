import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import NewsArticle from '../components/NewsArticle';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import { useArticles } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	const { user } = useAuth();
	const { articles, featuredPosts } = useArticles();
	const testVideoArticle: IVideoArticleContent = {
		title: 'Test article',
		postedDate: Date.now(),
		link: 'Home',
		videoUrl: 'NmaM5VsZCJM',
	};
	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
			carousel={featuredPosts}
		>
			<VideoArticle navigation={navigation} article={testVideoArticle} />
			{articles?.map((post, index) => {
				return (
					<NewsArticle
						key={index}
						image={post.image}
						article={post.article}
						navigation={navigation}
					/>
				);
			})}
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
