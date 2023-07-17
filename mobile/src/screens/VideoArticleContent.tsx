import { Image, ScrollView, Text, View } from 'native-base';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { RouteProp } from '@react-navigation/native';
import P from '../components/P';
import { IVideoProps } from '../components/VideoArticle';

export interface IVideoArticleContentProps {
	route: RouteProp<
		{ params: { article: IVideoProps; image: string } },
		'params'
	>;
}

const VideoArticleContent = ({ route }: IVideoArticleContentProps) => {
	const { width } = useWindowDimensions();
	const { article, image } = route.params;
	const [error, setError] = useState(false);

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
					height={width > 420 ? 470 : 220}
					videoId={article.youtubeId}
					onError={(err) => err && setError(true)}
					webViewProps={{
						allowsInlineMediaPlayback: true,
					}}
					initialPlayerParams={{
						preventFullScreen: false,
						controls: true,
						modestbranding: true,
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
