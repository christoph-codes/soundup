import axios from 'axios';

export type TFetchOptions =
	| 'featured'
	| 'articles'
	| 'videos'
	| 'ads'
	| 'images'
	| 'all';

const contentful = (
	fetchOption: TFetchOptions,
	paginationLimit: number,
	skip: number = paginationLimit,
) => {
	const contentfulContentType = () => {
		switch (fetchOption) {
			case 'featured':
				return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&fields.featured=true&limit=${paginationLimit}&skip=${skip}`;
			case 'articles':
				return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=newsArticle&limit=${paginationLimit}&skip=${skip}`;
			case 'videos':
				return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=videoArticle&limit=${paginationLimit}&skip=${skip}`;
			case 'ads':
				return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=ads`;
			case 'images':
				return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/assets?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`;
			case 'all':
				return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&limit=${paginationLimit}&skip=${skip}`;
		}
	};
	return axios.create({
		baseURL: contentfulContentType(),
	});
};

export default contentful;
