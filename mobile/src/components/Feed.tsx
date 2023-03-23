import { View } from 'react-native';
import { Text } from 'native-base';
import { NavigationProp } from '@react-navigation/native';
import { useContent } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import { TFetchOptions } from '../utils/contentful';
import Ad from './Ad';
import NewsArticle from './NewsArticle';
import VideoArticle from './VideoArticle';
import { StyleSheet } from 'react-native';

export interface IFeedProps {
	navigation?: NavigationProp<any>;
	fetchOption: TFetchOptions;
}

const Feed = ({ navigation, fetchOption }: IFeedProps) => {
	const { user } = useAuth();
	const { state } = useContent();

	const feed = () => {
		let adNum = 0;
		/* Taking the data from the state and adding ads to it. */
		const articlesWithAds = state[fetchOption].data.reduce(
			(acc, cv, idx) => {
				if (
					(idx > 2 && idx % 4 === 0) ||
					(idx + 1 === state[fetchOption].data.length &&
						state[fetchOption].data.length <= acc.length + 1)
				) {
					acc[idx] = state.ads.data[adNum];
					adNum++;
				} else {
					acc[idx] = cv;
				}
				return acc;
			},
			[],
		);
		return articlesWithAds;
	};

	return (
		<>
			<View style={styles.Feed}>
				{feed()?.map((post, index) => {
					if (post?.type === 'videoArticle') {
						return (
							<VideoArticle
								key={index}
								image={post.image}
								article={post.article}
								navigation={navigation}
								publishDate={post.publishDate}
							/>
						);
					}
					if (post?.type === 'ads' && !user.email) {
						return (
							<Ad
								key={index}
								image={post?.image}
								article={post?.article}
							/>
						);
					}
					if (post?.type === 'newsArticle') {
						return (
							<NewsArticle
								key={index}
								image={post?.image}
								article={post.article}
								navigation={navigation}
								publishDate={post.publishDate}
							/>
						);
					}
				})}
			</View>
			<Text color='#999' textAlign='center'>
				You are all up to date.
			</Text>
			<Text color='#999' textAlign='center'>
				Be sure to check back for more content!
			</Text>
		</>
	);
};

export default Feed;

const styles = StyleSheet.create({
	Feed: {
		display: 'flex',
		gap: '16px',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
});
