import { Image, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import P from '../components/P';

const VideoArticleContent = ({ navigation, route }) => {
	const { article, image } = route?.params;
	const [webViewKey, setWebViewKey] = useState(0);
	const [error, setError] = useState(false);
	const reload = () => {
		setWebViewKey((prev) => prev + 1);
	};
	return (
		<ScrollView style={styles.VideoArticleContent}>
			{error ? (
				<Image
					style={styles.VideoArticleContentImage}
					source={{ uri: `http:${image}` }}
					alt='Video Image Thumbnail'
					onError={(err) => err && setError(true)}
					resizeMode='cover'
				/>
			) : (
				<YoutubePlayer
					height={220}
					videoId={article.youtubeId}
					onError={(err) => err && setError(true)}
					webViewProps={{
						onContentProcessDidTerminate: reload,
						allowsInlineMediaPlayback: true,
					}}
				/>
			)}

			<View backgroundColor='white' paddingX={4}>
				{article?.title && (
					<Text
						color='#111111'
						fontSize='2xl'
						marginY={4}
						fontWeight='bold'
					>
						{article?.title}
					</Text>
				)}
				{article.description && (
					<P marginBottom={4} fontSize='xl'>
						{article.description}
					</P>
				)}
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	VideoArticleContent: {},
	VideoArticleContentImage: {
		width: '100%',
		height: 200,
	},
});

export default VideoArticleContent;
