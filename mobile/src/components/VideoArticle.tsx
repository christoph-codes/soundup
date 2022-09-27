import { NavigationProp } from '@react-navigation/native';
import { useState } from 'react';
import {
	ViewStyle,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Button from './Button';
import TextDate from './TextDate';

export interface IVideoArticleContent {
	/** Title of the article as a string */
	title?: string;
	/** Posted date of the article as a date object */
	postedDate?: Date | number;
	/** Link of the article as a string */
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
		<>
			<View style={[styles.VideoArticle, style]}>
				{article?.videoUrl && (
					<View style={styles.VideoArticleVideo}>
						<YoutubePlayer
							height={200}
							videoId={article?.videoUrl}
						/>
					</View>
				)}

				<View style={styles.VideoArticleContent}>
					{article?.title && (
						<TouchableOpacity
							onPress={() => navigation.navigate(article?.link)}
						>
							<Text style={styles.VideoArticleTitle}>
								{article?.title}
							</Text>
							{article?.postedDate && (
								<TextDate date={article?.postedDate} />
							)}
						</TouchableOpacity>
					)}
					{article?.link && (
						<Button
							navigation={navigation}
							link={article.link}
							size='small'
						>
							Watch
						</Button>
					)}
				</View>
			</View>
		</>
	);
};

export default VideoArticle;

const styles = StyleSheet.create({
	VideoArticle: {
		paddingVerticaled: 16,
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		marginBottom: 32,
	},
	VideoArticleContent: {
		backgroundColor: 'transparent',
		height: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 8,
		width: '100%',
	},
	VideoArticleVideo: {
		width: '100%',
	},
	VideoArticleTitle: {
		fontSize: 21,
		fontWeight: 'bold',
	},
});
