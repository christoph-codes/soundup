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
		<Box marginBottom={4}>
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
					height={180}
					resizeMode={'contain'}
				/>
			</Link>
		</Box>
	);
};

const styles = StyleSheet.create({
	AdImage: {},
	AdLink: {},
});

export default Ad;
