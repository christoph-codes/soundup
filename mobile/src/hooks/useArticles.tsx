import { useEffect, useState } from 'react';
import { TFetchOptions } from '../utils/contentful';
import { getContent, log } from '../utils/helper';

const useArticles = (
	fetchOption: TFetchOptions,
): { articles: any[]; reFetch: () => Promise<void>; isLoading: boolean } => {
	const [articles, setArticles] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchArticles = async () => {
		try {
			const result = await getContent(fetchOption);
			// log('result', result);
			setArticles(result);
		} catch (error) {
			log('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, [fetchOption]);

	return { articles, reFetch: fetchArticles, isLoading };
};

export default useArticles;
