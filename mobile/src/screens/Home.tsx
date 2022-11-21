import { Text } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import NewsArticle from '../components/NewsArticle';
import VideoArticle, { IVideoArticleContent } from '../components/VideoArticle';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import contentful from '../utils/contentful';

const Home = ({ navigation }) => {
	const { user } = useAuth();
	const [posts, setPosts] = useState<any>({});
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
			{posts.items?.map((post, index) => {
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
