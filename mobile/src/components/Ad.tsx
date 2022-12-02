import { Image } from 'native-base';
import Link from './Link';

export interface IAdProps {
	image: string;
	url: string;
	company: string;
	name: string;
}

const Ad = ({ image, url, company, name }: IAdProps) => {
	return (
		<Link link={url}>
			<Image
				source={{ uri: `http:${image}` }}
				width='100%'
				height={'200'}
				alt={`${name} by ${company}`}
			/>
		</Link>
	);
};

export default Ad;
