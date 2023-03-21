import { NavigationProp } from '@react-navigation/native';
import { View, Text, Image } from 'native-base';
import { ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import Article from './Article';
import TextDate from './TextDate';

export interface INewsArticleProps {
	publishDate?: Date;
	/** Article Content object to be used in the component */
	article?: any;
	/** Featured image of the article */
	image?: string;
	/** Style object that will be passed to the View component */
	style?: ViewStyle;
	/** Navigation object that is passed from the react navigation router */
	navigation: NavigationProp<any>;
}

const NewsArticle = ({
	publishDate,
	article,
	image,
	navigation,
}: INewsArticleProps) => {
	return (
		<Article>
			<TouchableOpacity
				style={[styles.NewsArticle]}
				onPress={() => {
					navigation.navigate('News Article Content', {
						article,
						image,
					});
				}}
			>
				{image && (
					<Image
						style={styles.NewsArticleImage}
						source={{ uri: `http:${image}` }}
						alt='Article Image Thumbnail'
						resizeMode='cover'
						width='100%'
						height={200}
					/>
				)}
				<View style={styles.NewsArticleContent}>
					{article?.title && (
						<TouchableOpacity
							onPress={() => navigation.navigate(article?.link)}
						>
							<Text style={styles.NewsArticleTitle}>
								{article?.title}
							</Text>
							<TextDate date={publishDate} />
						</TouchableOpacity>
					)}
				</View>
			</TouchableOpacity>
		</Article>
	);
};

export default NewsArticle;

const styles = StyleSheet.create({
	NewsArticle: {
		paddingVerticaled: 16,
		flex: 1,
	},
	NewsArticleImage: {
		width: '100%',
		height: 200,
		marginBottom: 16,
	},
	NewsArticleContent: {
		backgroundColor: 'transparent',
		height: 'auto',
		padding: 0,
		marginBottom: 0,
		width: '100%',
	},
	NewsArticleTitle: {
		fontSize: 21,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#111111',
		textTransform: 'capitalize',
		lineHeight: 24,
	},
	NewsArticleDescription: {
		fontSize: 16,
		marginBottom: 8,
	},
});
