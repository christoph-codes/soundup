import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';
import { log } from '../utils/helper';

const News = ({ navigation }) => {
	const { articles, reFetch } = useArticles('articles');

	log('hello');

	return (
		<TemplateMain
			style={styles.News}
			title='News'
			navigation={navigation}
			carousel={articles?.filter((post) => post.featured)}
			onRefresh={() => reFetch()}
		>
			<View>
				<Feed navigation={navigation} content={articles} />
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
