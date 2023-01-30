import { useCallback } from 'react';
import { createContext, useContext, useState, useReducer } from 'react';
import contentReducer from '../reducers/contentReducer';
import contentful, { TFetchOptions } from '../utils/contentful';
import { getImage } from '../utils/helper';

export type TStateOptions = 'articles' | 'featured' | 'ads' | 'videos';

const ContentContext = createContext(null);

const initialState = {
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
			console.log('fetchOption', fetchOption);
			const fetchLimit = 10;
			contentful(fetchOption, fetchLimit, fetchLimit * pagination)
				.get('')
				.then((res) => {
					const structuredPosts = res.data.items.map((cv, idx) => {
						console.log('cv', cv);
						// TODO: Convert to switch
						const contentImage =
							cv?.sys?.contentType?.sys?.id === 'newsArticle'
								? getImage(cv?.fields?.featuredImage?.sys?.id)
								: cv?.sys?.contentType?.sys?.id === 'ads'
								? getImage(cv?.fields?.artwork?.sys?.id)
								: cv?.sys?.contentType?.sys?.id ===
								  'videoArticle'
								? `//i3.ytimg.com/vi/${cv.fields.youtubeId}/maxresdefault.jpg`
								: null;
						console.log('IMAGE', contentImage);
						if (contentImage !== null) {
							return {
								featured: cv.fields.featured,
								image: contentImage,
								article: cv.fields,
								type: cv?.sys?.contentType?.sys?.id,
							};
						}
					});

					console.log('STRUC', {
						[fetchOption]: {
							data: [
								...state[fetchOption].data,
								...structuredPosts,
							],
							pagination,
						},
					});
					dispatch({
						[fetchOption]: {
							data: [
								...state[fetchOption].data,
								...structuredPosts,
							],
							pagination,
						},
					});
				})
				.catch((err) => console.log('Error!!!!', err));
		},
		[state],
	);

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
