import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { useContent } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import TemplateMain from '../templates/TemplateMain';

const Home = ({ navigation }) => {
	const fetching = 'videos';
	const { user } = useAuth();
	const { state, getContent, incrementPagination } = useContent();

	useEffect(() => {
		getContent(fetching);
	}, [state[fetching].pagination]);

	return (
		<TemplateMain
			style={styles.Home}
			navigation={navigation}
			title={user?.name ? `Hey ${user.name}!` : 'Latest Updates'}
			carousel={state.featured.data.filter((art) => art.featured)}
			onRefresh={() => getContent('all', state[fetching].pagination)}
			onEndReach={() => incrementPagination(fetching)}
		>
			{/* <VideoArticle navigation={navigation} article={testVideoArticle} /> */}
			<Feed
				arrayOfArticles={state[fetching].data}
				navigation={navigation}
			/>
		</TemplateMain>
	);
};

export default Home;

const styles = StyleSheet.create({
	Home: {},
});
