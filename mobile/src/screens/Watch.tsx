import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';
import { INavigationOnly } from '../types/globalTypes';
import AuthWrapper from '../components/AuthWrapper';

const Watch = ({ navigation }: INavigationOnly) => {
	const { articles, reFetch } = useArticles('videos');

	return (
		<AuthWrapper navigation={navigation}>
			<TemplateMain
				style={styles.Watch}
				title='Watch'
				navigation={navigation}
				carousel={articles?.filter((post) => post.featured)}
				onRefresh={() => reFetch()}
			>
				<Feed content={articles} navigation={navigation} />
			</TemplateMain>
		</AuthWrapper>
	);
};

const styles = StyleSheet.create({
	Watch: {},
});

export default Watch;
