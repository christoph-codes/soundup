import { Image } from 'native-base';
import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';

const NewsArticleContent = ({ navigation, route }) => {
	const { article, image } = route?.params;
	console.log('article content', article.fields.content.content);
	const parseContent = (content: any[]) => {
		// TODO: Create parser here!
	};
	return (
		<View style={styles.NewsArticleContent}>
			{image && (
				<Image
					style={styles.NewsArticleContentFeaturedImage}
					source={{ uri: `http:${image}` }}
					alt='Article Image'
				/>
			)}
			<View backgroundColor='white' paddingX={4}>
				{article?.fields?.title && (
					<Text
						color='#111111'
						fontSize='2xl'
						marginTop={4}
						fontWeight='bold'
					>
						{article?.fields?.title}
					</Text>
				)}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	NewsArticleContent: {},
	NewsArticleContentFeaturedImage: {
		width: '100%',
		height: 200,
	},
});

export default NewsArticleContent;
