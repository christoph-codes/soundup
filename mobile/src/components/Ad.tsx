import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'native-base';
import Link from './Link';
import Article from './Article';

export interface IAd {
	image: string;
	url: string;
	company: string;
	name: string;
}
export interface IAdProps {
	image: string;
	article: IAd;
}

const Ad = ({ image, article }: IAdProps) => (
	<Article style={styles.Ad}>
		<Link href={article.url} style={styles.AdLink} backgroundColor='red'>
			<View style={styles.AdImage}>
				<Image
					style={styles.AdImage}
					source={{ uri: `http:${image}` }}
					alt={`${article.name} by ${article.company}`}
					resizeMode='cover'
				/>
			</View>
		</Link>
		<Text fontSize='sm' color='#C0C0C0' marginBottom={2} textAlign='left'>
			Sponsored
		</Text>
	</Article>
);

const styles = StyleSheet.create({
	Ad: {
		paddingBottom: 16,
		borderStyleBottom: 'solid',
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
		marginBottom: 32,
		flexDirection: 'column',
	},
	AdImage: {
		width: '100%',
		minHeight: 180,
	},
	AdLink: {
		width: '100%',
		alignItems: 'center',
		position: 'relative',
	},
});

export default Ad;
