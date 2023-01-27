import { StyleSheet, View } from 'react-native';
import Ad from '../components/Ad';
import NewsArticle from '../components/NewsArticle';
import { useArticles } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';

const News = ({ navigation }) => {
	const { user } = useAuth();
	const { articles, ads } = useArticles();
	const feed = () => {
		let adNum = 0;
		const allArticles = articles.reduce((acc, cv, idx) => {
			if (idx > 2 && idx % 4 === 0) {
				console.log('ad');
				acc[idx] = ads[adNum];
				adNum++;
			} else {
				console.log('artic');
				acc[idx] = cv;
			}
			return acc;
		}, []);
		return allArticles;
	};
	return (
		<TemplateMain
			style={styles.News}
			title='News'
			navigation={navigation}
			carousel
		>
			<View>
				{feed()?.map((post, index) => {
					if (post?.article?.adName && !user.email) {
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
			</View>
		</TemplateMain>
	);
};

export default News;

const styles = StyleSheet.create({
	News: {
		flex: 1,
	},
});
