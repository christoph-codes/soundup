import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import { useContent } from '../providers/ArticleProvider';
import TemplateMain from '../templates/TemplateMain';

const News = ({ navigation }) => {
	const { articles } = useContent();
	return (
		<TemplateMain
			style={styles.News}
			title='News'
			navigation={navigation}
			carousel
			onRefresh={() => console.log('Refreshing')}
		>
			<View>
				<Feed navigation={navigation} arrayOfArticles={articles} />
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
