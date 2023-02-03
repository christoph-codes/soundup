import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import { useContent } from '../providers/ArticleProvider';
import TemplateMain from '../templates/TemplateMain';

const News = ({ navigation }) => {
	const { state, getContent } = useContent();

	return (
		<TemplateMain
			style={styles.News}
			title='News'
			navigation={navigation}
			carousel={state.articles.data.filter(
				(post) => post.article.featured,
			)}
			onRefresh={() => getContent('articles')}
		>
			<View>
				<Feed navigation={navigation} fetchOption='articles' />
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
