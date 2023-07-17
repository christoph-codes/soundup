import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import contentful, { TFetchOptions } from './contentful';

export const log = (message: string, value?: any) => {
	const osPrefix = Platform.OS === 'ios' ? 'iOS' : 'Android';
	// eslint-disable-next-line no-console
	console.log(`[${osPrefix}] ${message}`, value || '');
};

export const checkRegex = (value: string, expression: string): boolean => {
	const regex = new RegExp(expression);
	const isValid = regex.test(value);
	return isValid;
};

export const getImage = async (assetId: string): Promise<string> =>
	axios
		.get(
			`https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/assets/${assetId}?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`,
			{
				timeout: 5000,
			},
		)
		.then((res) => res.data.fields.file.url)
		.catch((err) => {
			if (axios.isCancel(err)) {
				log('Image Fetch ERROR:', err.message);
			} else if (err.code === 'ECONNABTED') {
				log('Request timed out:', err.message);
			} else {
				// eslint-disable-next-line no-console
				console.error('getImage', err);
			}
		});

export const getContent = async (
	fetchOption: TFetchOptions = 'all',
	pagination = 0,
) => {
	const fetchLimit = 50;
	return contentful(fetchOption, fetchLimit, fetchLimit * pagination)
		.get('')
		.then((res) => {
			const promises = res.data.items.map(async (cv) => {
				const contentImage = async () => {
					switch (cv.sys.contentType.sys.id) {
						case 'newsArticle':
							return getImage(cv.fields.featuredImage.sys.id);
						case 'ads':
							return getImage(cv.fields.artwork.sys.id);
						case 'videoArticle':
							return `//i3.ytimg.com/vi/${cv.fields.youtubeId}/hqdefault.jpg`;
						default:
							return null;
					}
				};
				const imageVariable =
					(await contentImage()) !== null && (await contentImage());

				if (imageVariable !== null) {
					const contentType =
						cv.sys.contentType.sys.id === 'ads'
							? 'ads'
							: cv.sys.contentType.sys.id === 'videoArticle'
							? 'videos'
							: 'newsArticle';
					const newStructure = {
						image: imageVariable,
						article: cv.fields,
						type: contentType,
						featured: cv.fields.featured,
						publishDate: cv.sys.createdAt,
					};
					return newStructure;
				}
				return null;
			});
			return Promise.all(promises).then((resolved) => resolved);
		})
		.catch((err) => log('Error!!!!', err));
	// .finally(() => log('done'));
};

export const storage = {
	async get(key: string) {
		return JSON.parse(await AsyncStorage.getItem(key));
	},
	async set(key: string, data: any) {
		AsyncStorage.setItem(key, JSON.stringify(data));
	},
	async remove(key: string) {
		AsyncStorage.removeItem(key);
	},
};
