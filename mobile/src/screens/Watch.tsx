import { StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { useContent } from '../providers/ArticleProvider';
import TemplateMain from '../templates/TemplateMain';

const Watch = ({ navigation }) => {
	const { state, getContent, incrementPagination } = useContent();
	const featuredVideos = state.videos.data.filter(
		(vid) => vid.article.featured,
	);

	return (
		<TemplateMain
			style={styles.Watch}
			title='Watch'
			navigation={navigation}
			carousel={featuredVideos}
			onRefresh={() => getContent('videos', state.videos.pagination)}
		>
			<Feed fetchOption='videos' navigation={navigation} />
		</TemplateMain>
	);
};

const styles = StyleSheet.create({
	Watch: {},
});

export default Watch;
