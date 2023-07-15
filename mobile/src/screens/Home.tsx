import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';
import { INavigationOnly } from '../types/globalTypes';
import AuthWrapper from '../components/AuthWrapper';

const Home = ({ navigation }: INavigationOnly) => {
	const { user, loading } = useAuth();

	const { articles, reFetch } = useArticles('all');

	return (
		<AuthWrapper navigation={navigation}>
			<TemplateMain
				style={styles.Home}
				navigation={navigation}
				title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
				// @ts-ignore
				carousel={articles?.filter((post) => post.article.featured)}
				onRefresh={() => reFetch()}
			>
				<Feed
					navigation={navigation}
					content={articles}
					loading={loading}
				/>
			</TemplateMain>
		</AuthWrapper>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
