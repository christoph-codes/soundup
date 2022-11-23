import { createContext, useContext, useEffect, useState } from 'react';
import contentful from '../utils/contentful';

const ArticleContext = createContext(null);

const ArticleProvider = ({ children }) => {
	const [posts, setPosts] = useState<any>({});
	useEffect(() => {
		contentful
			.get('')
			.then((res) => {
				setPosts(res.data);
			})
			.catch(console.log);
	}, []);
	/* Filtering the posts to only show the featured posts. */
	const featuredPosts = posts?.items?.reduce((acc, cv, idx) => {
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
	}, []);
	return (
		<ArticleContext.Provider value={{ posts, featuredPosts }}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticles = () => useContext(ArticleContext);

export default ArticleProvider;
