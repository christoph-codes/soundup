import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';

const Home = ({ navigation }) => {
	const { user } = useAuth();

	const { articles, reFetch } = useArticles('all');

	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
			// @ts-ignore
			carousel={articles?.filter((post) => post.article.featured)}
			onRefresh={() => reFetch()}
			// onEndReach={() => incrementPagination(fetching)}
		>
			<Feed navigation={navigation} content={articles} />
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
