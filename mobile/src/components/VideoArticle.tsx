import { NavigationProp } from '@react-navigation/native';
import { Image } from 'native-base';
import { useState } from 'react';
import {
	ViewStyle,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import TextDate from './TextDate';

export interface IVideoProps {
	/** Title of the article as a string */
	title?: string;
	/** Posted date of the article as a date object */
	publishDate?: Date | number;
	/** Link of the article as a string */
	link?: string;
	/** URL or path to the image source to be fetched as a string */
	youtubeId?: string;
	/** Dscription of the video */
	description?: string;
}

export interface IVideoArticleProps {
	image?: string;
	/** Article Content object to be used in the component */
	article?: IVideoProps;
	/** Style object that will be passed to the View component */
	style?: ViewStyle;
	/** Navigation object that is passed from the react navigation router */
	navigation: NavigationProp<any>;
}

const VideoArticle = ({
	style,
	image,
	article,
	navigation,
}: IVideoArticleProps) => {
	const [error, setError] = useState(false);

	return (
		<>
			{error ? (
				<Text>Video Thumbnail Didn't Load.</Text>
			) : (
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Video Article Content', {
							article,
							image,
						});
					}}
				>
					<View style={[styles.VideoArticle, style]}>
						{article?.youtubeId && (
							<View style={styles.VideoArticleImage}>
								<Image
									style={styles.VideoArticleImage}
									source={{ uri: `http:${image}` }}
									alt='Video Image Thumbnail'
									onError={(err) => setError(true)}
									resizeMode='cover'
								/>
							</View>
						)}

						<View style={styles.VideoArticleContent}>
							{article?.title && article?.publishDate && (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(article?.link)
									}
								>
									<Text style={styles.VideoArticleTitle}>
										{article?.title}
									</Text>
									<TextDate date={article?.publishDate} />
								</TouchableOpacity>
							)}
						</View>
					</View>
				</TouchableOpacity>
			)}
		</>
	);
};

export default VideoArticle;

const styles = StyleSheet.create({
	VideoArticle: {
		paddingBottom: 16,
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center',
		marginBottom: 32,
		borderStyleBottom: 'solid',
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
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
	VideoArticleImage: {
		width: '100%',
		minHeight: 200,
	},
	VideoArticleTitle: {
		fontSize: 21,
		fontWeight: 'bold',
	},
});
