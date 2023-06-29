import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';

const Watch = ({ navigation }) => {
	const { articles, reFetch } = useArticles('videos');

	return (
		<TemplateMain
			style={styles.Watch}
			title='Watch'
			navigation={navigation}
			carousel={articles?.filter((post) => post.featured)}
			onRefresh={() => reFetch()}
		>
			<Feed content={articles} navigation={navigation} />
		</TemplateMain>
	);
};

const styles = StyleSheet.create({
	Watch: {},
});

export default Watch;
