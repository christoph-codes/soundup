import { NavigationProp } from '@react-navigation/native';
import { Image } from 'native-base';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Article from './Article';
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
	publishDate?: Date;
	image?: string;
	/** Article Content object to be used in the component */
	article?: IVideoProps;
	/** Navigation object that is passed from the react navigation router */
	navigation: NavigationProp<any>;
}

const VideoArticle = ({
	image,
	article,
	publishDate,
	navigation,
}: IVideoArticleProps) => {
	const [error, setError] = useState(false);

	return (
		<Article>
			{error ? (
				// eslint-disable-next-line react/no-unescaped-entities
				<Text>Video Thumbnail Didn't Load.</Text>
			) : (
				<TouchableOpacity
					style={{ width: '100%' }}
					onPress={() => {
						navigation.navigate('Video Article Content', {
							article,
							image,
						});
					}}
				>
					<View style={styles.VideoArticle}>
						{article?.youtubeId && (
							<View style={styles.VideoArticleImage}>
								<Image
									style={styles.VideoArticleImage}
									source={{ uri: `http:${image}` }}
									alt='Video Image Thumbnail'
									onError={() => setError(true)}
									resizeMode='cover'
								/>
							</View>
						)}
						<View style={styles.VideoArticleContent}>
							{article?.title && article?.publishDate && (
								<>
									<Text style={styles.VideoArticleTitle}>
										{article?.title}
									</Text>
									<TextDate date={publishDate} />
								</>
							)}
						</View>
					</View>
				</TouchableOpacity>
			)}
		</Article>
	);
};

export default VideoArticle;

const styles = StyleSheet.create({
	VideoArticle: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	VideoArticleContent: {
		backgroundColor: 'transparent',
		height: 'auto',
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
