import { useEffect, useState } from 'react';
import { TFetchOptions } from '../utils/contentful';
import { getContent } from '../utils/helper';

const useArticles = (
	fetchOption: TFetchOptions,
): { articles: any[]; reFetch: () => Promise<void> } => {
	const [articles, setArticles] = useState(null);

	const fetchArticles = async () => {
		try {
			const result = await getContent(fetchOption);
			// log('result', result);
			setArticles(result);
		} catch (error) {
			console.log('Error:', error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, [fetchOption]);

	return { articles, reFetch: fetchArticles };
};

export default useArticles;
