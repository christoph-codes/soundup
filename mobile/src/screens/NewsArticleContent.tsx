import { Image, ScrollView, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import P from '../components/P';

const NewsArticleContent = ({ navigation, route }) => {
	const { article, image } = route?.params;
	return (
		<ScrollView style={styles.NewsArticleContent}>
			{image && (
				<Image
					style={styles.NewsArticleContentFeaturedImage}
					source={{ uri: `http:${image}` }}
					alt='Article Image'
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
				{article.content.content.map((node) => {
					if (node.nodeType === 'paragraph') {
						return (
							<P marginBottom={4} fontSize='xl'>
								{node.content[0].value}
							</P>
						);
					}
					return null;
				})}
			</View>
		</ScrollView>
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
