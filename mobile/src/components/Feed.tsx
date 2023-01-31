import { useEffect } from 'react';
import { useContent } from '../providers/ArticleProvider';
import { useAuth } from '../providers/AuthProvider';
import Ad from './Ad';
import NewsArticle from './NewsArticle';
import VideoArticle from './VideoArticle';

const Feed = ({ navigation, arrayOfArticles }) => {
	const { user } = useAuth();
	const { state, getContent } = useContent();

	useEffect(() => {
		getContent('ads', state.ads.pagination);
	}, [state.ads.pagination]);

	const feed = () => {
		let adNum = 0;
		const articlesWithAds = arrayOfArticles.reduce((acc, cv, idx) => {
			if (idx > 2 && idx % 4 === 0) {
				acc[idx] = state.ads.data[adNum];
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
			{feed()?.map((post, index) => {
				if (post?.type === 'videoArticle') {
					return (
						<VideoArticle
							key={index}
							article={post.article}
							navigation={navigation}
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
				if (post?.type === 'newsArticle' && post.image) {
					return (
						<NewsArticle
							key={index}
							image={post?.image}
							article={post.article}
							navigation={navigation}
						/>
					);
				}
			})}
		</>
	);
};

export default Feed;
