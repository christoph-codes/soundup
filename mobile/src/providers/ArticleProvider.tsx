import { createContext, useContext, useState, useReducer } from 'react';
import contentReducer from '../reducers/contentReducer';
import contentful from '../utils/contentful';
import { getImage } from '../utils/helper';

const ContentContext = createContext(null);

const initialState = {
	articles: [],
	featured: [],
	ads: [],
	videos: [],
};

const ContentProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contentReducer, initialState);
	const [pagination, setPagination] = useState<number>(1);

	/**
	 * A function that queries Contentful for a number of articles with refetch capabilities
	 * @param fetchLimit = The number of articles to fetch from contentful
	 * @param pagination The page number you are fetching for
	 */
	const getArticles = (fetchLimit = 5, pagination = 1) => {
		console.log('getting articles');
		contentful('all', fetchLimit, fetchLimit * pagination)
			.get('')
			.then((res) => {
				const structuredPosts: {
					featured: boolean;
					image: string;
					article: any;
					type: 'newsArticle' | 'videoArticle' | 'ads';
				}[] = res.data.items.map(async (cv, idx) => {
					console.log('cv', cv);
					// TODO: Convert to switch
					const contentImage =
						cv?.sys?.contentType?.sys?.id === 'newsArticle'
							? await getImage(cv?.fields?.featuredImage?.sys?.id)
							: cv?.sys?.contentType?.sys?.id === 'ads'
							? await getImage(cv?.fields?.artwork?.sys?.id)
							: cv?.sys?.contentType?.sys?.id === 'videoArticle'
							? `//i3.ytimg.com/vi/${cv.fields.youtubeId}/maxresdefault.jpg`
							: null;
					if (contentImage !== null) {
						console.log('idx', {
							key: idx,
							featured: cv.fields.featured,
							image: contentImage,
							article: cv.fields,
							type: cv?.sys?.contentType?.sys?.id,
						});
						return {
							key: idx,
							featured: cv.fields.featured,
							image: contentImage,
							article: cv.fields,
							type: cv?.sys?.contentType?.sys?.id,
						};
					}
				});
				console.log('struc', structuredPosts);
				dispatch({
					articles: structuredPosts,
				});
			})
			.catch((err) => console.log('Error!!!!', err));
	};

	const loadMoreArticles = () => {
		console.log('pagination', pagination);
		console.log('load more articles');
		setPagination((prev) => prev + 1);
	};

	return (
		<ContentContext.Provider
			value={{
				state,
				getArticles,
				loadMoreArticles,
			}}
		>
			{children}
		</ContentContext.Provider>
	);
};

export const useArticles = () => useContext(ContentContext);

export default ContentProvider;
