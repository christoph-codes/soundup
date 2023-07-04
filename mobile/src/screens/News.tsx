import { StyleSheet, View } from 'react-native';
import Feed from '../components/Feed';
import TemplateMain from '../templates/TemplateMain';
import useArticles from '../hooks/useArticles';
import { INavigationOnly } from '../types/globalTypes';
import AuthWrapper from '../components/AuthWrapper';

const News = ({ navigation }: INavigationOnly) => {
	const { articles, reFetch, isLoading } = useArticles('articles');

	return (
		<AuthWrapper navigation={navigation}>
			<TemplateMain
				style={styles.News}
				title='News'
				navigation={navigation}
				carousel={articles?.filter((post) => post.featured)}
				onRefresh={() => reFetch()}
			>
				<View>
					<Feed
						navigation={navigation}
						content={articles}
						loading={isLoading}
					/>
				</View>
			</TemplateMain>
		</AuthWrapper>
	);
};

export default News;

const styles = StyleSheet.create({
	News: {
		flex: 1,
	},
});
