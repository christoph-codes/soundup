import { createContext, useCallback, useContext, useReducer } from 'react';
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
	const getContent = useCallback(
		(fetchOption: TFetchOptions = 'all', pagination = 1) => {
			const fetchLimit = 15;
			contentful(fetchOption, fetchLimit, fetchLimit * pagination)
				.get('')
				.then((res) => {
					const promises = res.data.items.map(async (cv, idx) => {
						const contentImage = async () => {
							switch (cv.sys.contentType.sys.id) {
								case 'newsArticle':
									const articleImage = getImage(
										cv.fields.featuredImage.sys.id,
									);
									return await articleImage;
								case 'ads':
									const image = getImage(
										cv.fields.artwork.sys.id,
									);
									return await image;
								case 'videoArticle':
									return `//i3.ytimg.com/vi/${cv.fields.youtubeId}/hqdefault.jpg`;
								default:
									return null;
							}
						};
						const imageVariable =
							(await contentImage()) !== null &&
							(await contentImage());

						if (imageVariable !== null) {
							const contentType =
								cv.sys.contentType.sys.id === 'ads'
									? 'ads'
									: cv.sys.contentType.sys.id ===
									  'videoArticle'
									? 'videos'
									: 'articles';

							const newStructure = {
								image: imageVariable,
								article: cv.fields,
								type: cv.sys.contentType.sys.id,
							};
							return { contentType, newStructure };
						}
					}, initialState);
					Promise.all(promises).then((resolved) => {
						const structuredPosts = resolved.reduce((acc, cv) => {
							const { contentType, newStructure } = cv;
							acc[contentType].data.push(newStructure);
							acc.all.data.push(newStructure);
							return acc;
						}, initialState);
						dispatch({ ...structuredPosts });
					});
				})
				.catch((err) => console.log('Error!!!!', err));
		},
		[state],
	);

	const incrementPagination = (
		content: 'articles' | 'featured' | 'videos' | 'ads' | 'all',
	) => {
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
