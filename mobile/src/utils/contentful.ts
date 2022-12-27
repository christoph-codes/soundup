import axios from "axios";

type TFetchOptions = 'featured' | 'articles' | 'videos' | 'images' | 'all'

const contentful = (fetchOption: TFetchOptions) => {
    const contentfulContentType = () => {
        switch (fetchOption) {
            case 'featured':
                return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=newsArticle&fields.featured=true`
            case 'articles':
                return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=newsArticle`
            case 'videos':
                return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}&content_type=videoArticle`
            case 'images':
                return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/assets?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`
            case 'all':
                return `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN}`
        }
    }
    return axios.create({
            baseURL: contentfulContentType(),
    });
}

export default contentful;