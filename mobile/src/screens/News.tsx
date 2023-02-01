import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import { useContent } from '../providers/ArticleProvider';
import TemplateMain from '../templates/TemplateMain';

const News = ({ navigation }) => {
	const { state, getContent, incrementPagination } = useContent();

	useEffect(() => {
		getContent('articles', state.articles.pagination);
	}, [state.articles.pagination]);

	console.log('art', state.articles.data);

	return (
		<TemplateMain
			style={styles.News}
			title='News'
			navigation={navigation}
			carousel={state.articles.data.filter((art) => art.article.featured)}
			onRefresh={() => getContent('articles')}
			onEndReach={() => incrementPagination('articles')}
		>
			<View>
				<Feed
					navigation={navigation}
					arrayOfArticles={state.articles.data}
				/>
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
