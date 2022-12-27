import { StyleSheet } from 'react-native';
import VideoArticle, { IVideoProps } from '../components/VideoArticle';
import { useArticles } from '../providers/ArticleProvider';
import TemplateMain from '../templates/TemplateMain';

const Watch = ({ navigation }) => {
	const { videos } = useArticles();
	const featuredVideos = videos.filter((vid) => vid.article.featured);
	const testArticle: IVideoProps = {
		title: 'Test article',
		publishDate: Date.now(),
		link: 'Home',
		youtubeId: 'NmaM5VsZCJM',
	};
	return (
		<TemplateMain
			style={styles.Watch}
			title='Watch'
			navigation={navigation}
			carousel={featuredVideos}
		>
			{videos.map((video, index) => {
				return (
					<VideoArticle
						key={index}
						navigation={navigation}
						article={video.article}
					/>
				);
			})}
			<VideoArticle navigation={navigation} article={testArticle} />
			<VideoArticle navigation={navigation} article={testArticle} />
			<VideoArticle navigation={navigation} article={testArticle} />
			<VideoArticle navigation={navigation} article={testArticle} />
		</TemplateMain>
	);
};

const styles = StyleSheet.create({
	Watch: {},
});

export default Watch;
