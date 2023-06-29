import { Image, ScrollView, Text, View } from 'native-base';
import { StyleSheet, useWindowDimensions } from 'react-native';
import P from '../components/P';

export interface INewsArticleContent {
	route: any;
}

const NewsArticleContent = ({ route }: INewsArticleContent) => {
	const { width } = useWindowDimensions();
	const { article, image } = route.params;
	return (
		<ScrollView style={styles.NewsArticleContent}>
			{image && (
				<Image
					style={styles.NewsArticleContentFeaturedImage}
					source={{ uri: `http:${image}` }}
					alt='Article Image'
					height={width > 400 ? 470 : 220}
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
				{article.content.content.map((node, index) => {
					if (node.nodeType === 'paragraph') {
						return (
							<P key={index} marginBottom={4} fontSize='xl'>
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
	},
});

export default NewsArticleContent;
