import { NavigationProp } from '@react-navigation/native';
import { View } from 'native-base';
import { ViewStyle, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

export interface IVideoArticleContent {
	/** Title of the article as a string */
	title?: string;
	/** Posted date of the article as a date object */
	postedDate?: Date | number;
	/** Small description of the article as a string */
	link?: string;
	/** URL or path to the image source to be fetched as a string */
	videoUrl?: string;
}

export interface IVideoArticleProps {
	/** Article Content object to be used in the component */
	article?: IVideoArticleContent;
	/** Style object that will be passed to the View component */
	style?: ViewStyle;
	/** Navigation object that is passed from the react navigation router */
	navigation: NavigationProp<any>;
}

const VideoArticle = ({ style, article, navigation }: IVideoArticleProps) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate(article?.link)}>
			<View style={[styles.VideoArticle, style]}>
				{article?.videoUrl && (
					<Video
						source={{ uri: article?.videoUrl }}
						style={styles.VideoArticleVideo}
					/>
				)}
				<View style={styles.VideoArticleContent}>
					{article?.title && (
						<Text style={styles.VideoArticleTitle}>
							{article?.title}
						</Text>
					)}
					{article?.postedDate && (
						<Text style={styles.VideoArticlePostedDate}>
							{
								new Date(article?.postedDate)
									.toLocaleString('en')
									.split(',')[0]
							}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default VideoArticle;

const styles = StyleSheet.create({
	VideoArticle: {
		paddingVerticaled: 16,
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		alignItems: 'center',
		marginBottom: 16,
	},
	VideoArticleVideo: {
		marginRight: 16,
		width: 116,
		height: 116,
	},
	VideoArticleContent: {
		flexShrink: 1,
		backgroundColor: 'transparent',
		height: 'auto',
		padding: 0,
		marginBottom: 0,
	},
	VideoArticleTitle: {
		fontSize: 21,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	VideoArticleDescription: {
		fontSize: 16,
		marginBottom: 8,
	},
	VideoArticlePostedDate: {
		fontSize: 14,
		color: 'grey',
		marginBottom: 0,
	},
});
