import { StyleSheet, Dimensions, View } from 'react-native';
import { Image, Spacer, Text } from 'native-base';
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

const Ad = ({ image, article }: IAdProps) => {
	const window = Dimensions.get('window');
	return (
		<Article style={styles.Ad}>
			<View>
				<Link link={article.url} style={styles.AdLink}>
					<Image
						source={{ uri: `http:${image}` }}
						alt={`${article.name} by ${article.company}`}
						style={styles.AdImage}
						width={window.width}
						height={190}
						resizeMode={'contain'}
					/>
				</Link>
				<Text
					fontSize='sm'
					color='#C0C0C0'
					marginBottom={2}
					textAlign='left'
				>
					Sponsored
				</Text>
			</View>
		</Article>
	);
};

const styles = StyleSheet.create({
	Ad: {
		paddingBottom: 32,
		borderStyleBottom: 'solid',
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
		marginBottom: 32,
	},
	AdImage: {},
	AdLink: {},
});

export default Ad;
