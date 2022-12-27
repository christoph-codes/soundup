import { createContext, useContext, useEffect, useState } from 'react';
import { IAdProps } from '../components/Ad';
import { ICarouselProps } from '../components/Carousel';
import { IVideoProps } from '../components/VideoArticle';
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
	const [videos, setVideos] = useState<IVideoProps[]>([]);
	useEffect(() => {
		if (posts === null) {
			contentful('all')
				.get('')
				.then((res) => {
					setPosts(res.data);
				})
				.catch((err) => console.log('Error!!!!', err));
		}
	}, []);

	/* Filtering the posts to only show the featured posts. */
	useEffect(() => {
		// FIX: fires twice on initial render and update
		posts?.items?.forEach(async (cv) => {
			const contentImage =
				cv?.sys?.contentType?.sys?.id === 'newsArticle'
					? await getImage(cv?.fields?.featuredImage?.sys?.id)
					: cv?.sys?.contentType?.sys?.id === 'ads'
					? await getImage(cv?.fields?.artwork?.sys?.id)
					: null;
			if (cv?.fields?.featured) {
				setFeaturedPosts((prev) => {
					return [
						...prev,
						{
							image: contentImage,
							article: cv,
						},
					];
				});
			}
			if (cv?.sys?.contentType?.sys?.id === 'ads') {
				setAds((prev) => {
					return [
						...prev,
						{
							image: contentImage,
							article: cv.fields,
						},
					];
				});
			}
			if (cv?.sys?.contentType?.sys?.id === 'videoArticle') {
				setVideos((prev) => {
					return [
						...prev,
						{
							title: cv.fields.title,
							article: cv.fields,
						},
					];
				});
			}

			setArticles((prev) => {
				return [
					...prev,
					{
						image: contentImage,
						article: cv.fields,
					},
				];
			});
		});
	}, [posts]);

	return (
		<ArticleContext.Provider
			value={{ featuredPosts, articles, ads, videos }}
		>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticles = () => useContext(ArticleContext);

export default ArticleProvider;
