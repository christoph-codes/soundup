import { createContext, useContext, useEffect, useState } from 'react';
import { ICarouselProps } from '../components/Carousel';
import contentful from '../utils/contentful';

const ArticleContext = createContext(null);

const ArticleProvider = ({ children }) => {
	const [posts, setPosts] = useState<any>({});
	const [featuredPosts, setFeaturedPosts] = useState<ICarouselProps['data']>(
		[],
	);
	useEffect(() => {
		contentful
			.get('')
			.then((res) => {
				setPosts(res.data);
			})
			.catch(console.log);
	}, []);
	/* Filtering the posts to only show the featured posts. */

	useEffect(() => {
		// FIX: fires twice on initial render and update
		const featured = posts?.items?.reduce((acc, cv, idx) => {
			if (cv?.fields?.featured) {
				return [
					...acc,
					{
						title: cv?.fields?.title,
						image: posts['includes']?.Asset[idx]?.fields?.file?.url,
						article: cv,
					},
				];
			}
			return acc;
		}, []); // END Reduce function not dependency array
		() => setFeaturedPosts(featured);
	}, [posts]);
	return (
		<ArticleContext.Provider value={{ posts, featuredPosts }}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticles = () => useContext(ArticleContext);

export default ArticleProvider;
