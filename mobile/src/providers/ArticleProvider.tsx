import { createContext, useContext, useReducer } from 'react';
import contentReducer from '../reducers/contentReducer';
import contentful, { TFetchOptions } from '../utils/contentful';
import { getImage } from '../utils/helper';

export type TStateOptions = 'articles' | 'featured' | 'ads' | 'videos' | 'all';

const ContentContext = createContext(null);

const initialState = {
	all: {
		data: [],
		pagination: 1,
	},
	articles: {
		data: [],
		pagination: 1,
	},
	featured: {
		data: [],
		pagination: 1,
	},
	ads: {
		data: [],
		pagination: 1,
	},
	videos: {
		data: [],
		pagination: 1,
	},
};

const ContentProvider = ({ children }) => {
	const [state, dispatch] = useReducer(contentReducer, initialState);

	/**
	 * A function that queries Contentful for a number of articles with refetch capabilities
	 * @param pagination = The number of articles to fetch from contentful
	 */
	const getContent = (fetchOption: TFetchOptions = 'all', pagination = 1) => {
		// console.log('fetchOption', fetchOption);
		const fetchLimit = 25;
		contentful(fetchOption, fetchLimit, fetchLimit * pagination)
			.get('')
			.then(async (res) => {
				const structuredPosts = await res.data.items.reduce(
					(acc, cv, idx) => {
						// TODO: Convert to switch
						const contentImage =
							cv?.sys?.contentType?.sys?.id === 'newsArticle'
								? getImage(cv.fields.featuredImage.sys.id)
								: cv?.sys?.contentType?.sys?.id === 'ads'
								? getImage(cv.fields.artwork.sys.id)
								: cv?.sys?.contentType?.sys?.id ===
								  'videoArticle'
								? `//i3.ytimg.com/vi/${cv.fields.youtubeId}/maxresdefault.jpg`
								: null;

						if (
							contentImage !== null &&
							contentImage !== undefined
						) {
							const contentType =
								cv.sys.contentType.sys.id === 'ads'
									? 'ads'
									: cv.sys.contentType.sys.id ===
									  'videoArticle'
									? 'videos'
									: 'articles';
							console.log('contentImage', contentImage);
							acc[contentType].data.push({
								image: contentImage,
								article: cv.fields,
								type: cv.sys.contentType.sys.id,
							});
							acc.all.data.push({
								image: contentImage,
								article: cv.fields,
								type: cv.sys.contentType.sys.id,
							});
							return acc;
						}
					},
					initialState,
				);

				/* Waiting for all the promises to resolve before dispatching the action. */
				dispatch({
					...structuredPosts,
				});
			})
			.catch((err) => console.log('Error!!!!', err));
	};

	const incrementPagination = (
		content: 'articles' | 'featured' | 'videos' | 'ads',
	) => {
		console.log('incrementing');
		dispatch({
			[content]: {
				data: [...state[content].data],
				pagination: state[content].pagination + 1,
			},
		});
	};

	console.log('state', state);

	return (
		<ContentContext.Provider
			value={{
				state,
				getContent,
				incrementPagination,
			}}
		>
			{children}
		</ContentContext.Provider>
	);
};

export const useContent = () => useContext(ContentContext);

export default ContentProvider;
