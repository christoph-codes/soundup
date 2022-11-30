import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import Modal from '../components/Modal';
import NewsArticle from '../components/NewsArticle';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import { useArticles } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	const { user } = useAuth();
	const { posts, featuredPosts } = useArticles();
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
			<Modal buttonLabel='Open This Thang' />
			{posts?.items?.map((post, index) => {
				if (post.sys.contentType.sys.id === 'newsArticle') {
					return (
						<NewsArticle
							key={post.sys.id}
							image={
								posts['includes']?.Asset[index]?.fields?.file
									?.url
							}
							article={post}
							navigation={navigation}
						/>
					);
				} else if (post.sys.contentType.sys.id === 'videoArticle') {
					return (
						<VideoArticle
							key={post.sys.id}
							navigation={navigation}
							// TODO: Setup video article to show image
							// image={
							// 	post['includes']?.Asset[index]?.fields?.file
							// 		?.url
							// }
							article={post}
						/>
					);
				} else null;
			})}
			<Text>Home Content Goes Here</Text>
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
