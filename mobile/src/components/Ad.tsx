import { StyleSheet, Dimensions } from 'react-native';
import { Box, Image, Text } from 'native-base';
import Link from './Link';

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
		<Box marginBottom={4} style={styles.Ad}>
			<Text
				fontSize='sm'
				color='#C0C0C0'
				marginBottom={2}
				textAlign='right'
			>
				Sponsored
			</Text>
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
		</Box>
	);
};

const styles = StyleSheet.create({
	Ad: {
		paddingBottom: 32,
		flex: 1,
		borderStyleBottom: 'solid',
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
		marginBottom: 32,
	},
	AdImage: {},
	AdLink: {},
});

export default Ad;
