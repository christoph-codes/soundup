import axios from "axios";

export const checkRegex = (value: string, expression: string): boolean => {
	const regex = new RegExp(expression);
	const isValid = regex.test(value);
	return isValid;
};

export const getImage = async (assetId: string) => {
	return await axios
		.get(`https://images.ctfassets.net/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/assets/${assetId}`)
		.then(res => {
			console.log('res.data',res.data.fields);
			return res.data.fields.file.url
		})
		.catch(console.log);
}