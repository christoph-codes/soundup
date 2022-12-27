import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Ad from '../components/Ad';
import Modal from '../components/Modal';
import NewsArticle from '../components/NewsArticle';
import VideoArticle, { IVideoProps } from '../components/VideoArticle';
import { useArticles } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	const { user } = useAuth();
	const { articles, featuredPosts, ads } = useArticles();

	/**
	 * It takes an array of articles and ads, and returns a new array of articles and ads, with ads
	 * inserted every 4th article
	 * @returns An array of articles and ads.
	 */
	const feed = () => {
		let adNum = 0;
		const allArticles = articles.reduce((acc, cv, idx) => {
			if (idx > 1 && idx % 4 === 0) {
				acc.push(ads[adNum]);
				adNum++;
			} else {
				acc.push(cv);
			}
			return acc;
		}, []);
		return allArticles;
	};
	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
			carousel={featuredPosts}
		>
			{/* <VideoArticle navigation={navigation} article={testVideoArticle} /> */}
			{feed()?.map((post, index) => {
				if (post?.article?.youtubeId) {
					return (
						<VideoArticle
							key={index}
							article={post.article}
							navigation={navigation}
						/>
					);
				}
				if (post?.article?.adName && user.email) {
					return (
						<Ad
							key={index}
							image={post?.image}
							article={post?.article}
						/>
					);
				}
				if (post?.article?.content && post.image) {
					return (
						<NewsArticle
							key={index}
							image={post?.image}
							article={post.article}
							navigation={navigation}
						/>
					);
				}
			})}
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
