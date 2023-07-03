import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';
import { INavigationOnly } from '../types/globalTypes';

const News = ({ navigation }: INavigationOnly) => {
	const { articles, reFetch } = useArticles('articles');

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
