import { NavigationProp } from '@react-navigation/native';
import { Image, View, Text } from 'native-base';
import { ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import TextDate from './TextDate';

export interface INewsArticleProps {
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
	style,
	article,
	image,
	navigation,
}: INewsArticleProps) => {
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('News Article Content', { article, image });
			}}
		>
			<View style={[styles.NewsArticle, style]}>
				{image && (
					<Image
						source={{ uri: `http:${image}` }}
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
					{article?.sys?.createdAt && (
						<TextDate date={article?.sys?.createdAt} />
					)}
				</View>
			</View>
		</TouchableOpacity>
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
		alignItems: 'flex-start',
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
		color: '#111111',
	},
	NewsArticleDescription: {
		fontSize: 16,
		marginBottom: 8,
	},
});
