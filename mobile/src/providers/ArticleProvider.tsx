import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { IAdProps } from '../components/Ad';
import { ICarouselProps } from '../components/Carousel';
import contentful from '../utils/contentful';
import { getImage } from '../utils/helper';

const ArticleContext = createContext(null);

const ArticleProvider = ({ children }) => {
	const [posts, setPosts] = useState<any>(null);
	const [featuredPosts, setFeaturedPosts] = useState<ICarouselProps['data']>(
		[],
	);
	const [articles, setArticles] = useState<ICarouselProps['data']>([]);
	const [ads, setAds] = useState<IAdProps[]>([]);
	useEffect(() => {
		if (posts === null) {
			contentful('all')
				.get('')
				.then((res) => {
					setPosts(res.data);
				})
				.catch(console.log);
		}
	}, []);

	/* Filtering the posts to only show the featured posts. */
	useEffect(() => {
		// FIX: fires twice on initial render and update
		posts?.items?.forEach(async (cv, idx) => {
			const contentImage = await getImage(
				cv?.fields.featuredImage.sys.id,
			);

			if (cv.sys.contentType.sys.id === 'newsArticle') {
				if (cv?.fields?.featured) {
					console.log('cv?.fields', cv?.fields.featuredImage.sys.id);
					setFeaturedPosts((prev) => {
						return [
							...prev,
							{
								title: cv?.fields?.title,
								image: contentImage,
								article: cv,
							},
						];
					});
				} else {
					setArticles((prev) => {
						return [
							...prev,
							{
								title: cv?.fields?.title,
								image: posts['includes']?.Asset[idx]?.fields
									?.file?.url,
								article: cv,
							},
						];
					});
				}
			}
			if (cv.sys.contentType.sys.id === 'ads') {
				setAds((prev) => {
					return [
						...prev,
						{
							image: posts['includes']?.Asset[idx]?.fields?.file
								?.url,
							url: cv.fields.url,
							name: cv.fields.adName,
							company: cv.fields.company,
						},
					];
				});
			}
		});
	}, [posts]);
	return (
		<ArticleContext.Provider value={{ featuredPosts, articles, ads }}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticles = () => useContext(ArticleContext);

export default ArticleProvider;
