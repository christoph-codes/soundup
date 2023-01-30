import axios from 'axios';

export const checkRegex = (value: string, expression: string): boolean => {
	const regex = new RegExp(expression);
	const isValid = regex.test(value);
	return isValid;
};

export const getImage = async (assetId: string) => {
	return await axios
		.get(
			`https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/assets/${assetId}?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`,
		)
		.then((res) => res.data.fields.file.url)
		.catch((err) => console.log('Image Fetch ERROR:', err));
};
