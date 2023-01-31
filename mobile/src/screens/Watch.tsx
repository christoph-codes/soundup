import { StyleSheet } from 'react-native';
import VideoArticle from '../components/VideoArticle';
import { useContent } from '../providers/ArticleProvider';
import TemplateMain from '../templates/TemplateMain';

const Watch = ({ navigation }) => {
	const { state, getContent } = useContent();
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
			{state.videos.data.map((video, index) => {
				return (
					<VideoArticle
						key={index}
						navigation={navigation}
						article={video.article}
					/>
				);
			})}
		</TemplateMain>
	);
};

const styles = StyleSheet.create({
	Watch: {},
});

export default Watch;
