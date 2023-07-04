import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../providers/AuthProvider';
import Ad from './Ad';
import NewsArticle from './NewsArticle';
import VideoArticle from './VideoArticle';
import useArticles from '../hooks/useArticles';

export interface IFeedProps {
	navigation: NavigationProp<any>;
	content: any[];
}

const Feed = ({ navigation, content }: IFeedProps) => {
	const { user } = useAuth();

	const ads = useArticles('ads');

	const feed = () => {
		let adNum = 0;
		/* Taking the data from the state and adding ads to it. */
		const articlesWithAds = content?.reduce((acc, cv, idx) => {
			if (
				(idx > 2 && idx % 4 === 0) ||
				(idx + 1 === content.length && content.length <= acc.length + 1)
			) {
				acc[idx] = ads?.[adNum];
				adNum++;
			} else {
				acc[idx] = cv;
			}
			return acc;
		}, []);
		return articlesWithAds;
	};

	return (
		<>
			<View style={styles.Feed}>
				{feed?.()?.map((post, index) => {
					if (post?.type === 'videos') {
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
					if (post?.type === 'ads' && user.type === 'default') {
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
					return null;
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
		flexGap: '16px',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
});
