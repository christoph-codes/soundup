import { NavigationProp } from '@react-navigation/native';
import { Image, View } from 'native-base';
import { ViewStyle, Text, StyleSheet, TouchableHighlight } from 'react-native';

export interface IArticleContent {
	/** Title of the article as a string */
	title?: string;
	/** Posted date of the article as a date object */
	postedDate?: Date | number;
	/** Small description of the article as a string */
	description?: string;
	/** Screen name of the article as a string */
	link?: string;
	/** URL or path to the image source to be fetched as a string */
	imgUrl?: string;
}

export interface INewsArticleProps {
	/** Article Content object to be used in the component */
	article?: IArticleContent;
	/** Style object that will be passed to the View component */
	style?: ViewStyle;
	/** Navigation object that is passed from the react navigation router */
	navigation: NavigationProp<any>;
}

const NewsArticle = ({ style, article, navigation }: INewsArticleProps) => {
	return (
		<TouchableHighlight onPress={() => navigation.navigate(article?.link)}>
			<View style={[styles.NewsArticle, style]}>
				{article?.imgUrl && (
					<Image
						source={{ uri: article?.imgUrl }}
						alt='Article Image'
						style={styles.NewsArticleImage}
					/>
				)}
				<View style={styles.NewsArticleContent}>
					{article?.title && (
						<Text style={styles.NewsArticleTitle}>
							{article?.title}
						</Text>
					)}
					{article?.description && (
						<Text style={styles.NewsArticleDescription}>
							{article?.description}
						</Text>
					)}
					{article?.postedDate && (
						<Text style={styles.NewsArticlePostedDate}>
							{new Date(article?.postedDate).toLocaleString('en')}
						</Text>
					)}
				</View>
			</View>
		</TouchableHighlight>
	);
};

export default NewsArticle;

const styles = StyleSheet.create({
	NewsArticle: {
		paddingVerticaled: 16,
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		alignItems: 'center',
		marginBottom: 16,
	},
	NewsArticleImage: {
		marginRight: 16,
		width: 116,
		height: 116,
	},
	NewsArticleContent: {
		flexShrink: 1,
		backgroundColor: 'transparent',
		height: 'auto',
		padding: 0,
		marginBottom: 0,
	},
	NewsArticleTitle: {
		fontSize: 21,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	NewsArticleDescription: {
		fontSize: 16,
		marginBottom: 8,
	},
	NewsArticlePostedDate: {
		fontSize: 14,
		color: 'grey',
		marginBottom: 0,
	},
});
