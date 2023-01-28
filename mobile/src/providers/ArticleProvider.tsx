import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from 'react';
import { IAdProps } from '../components/Ad';
import { ICarouselProps } from '../components/Carousel';
import { IVideoProps } from '../components/VideoArticle';
import contentful from '../utils/contentful';
import { getImage } from '../utils/helper';

const ArticleContext = createContext(null);

const ArticleProvider = ({ children }) => {
	const fetchLimit: number = 10;
	const [posts, setPosts] = useState<any>(null);
	const [pagination, setPagination] = useState<number>(1);
	const [featuredPosts, setFeaturedPosts] = useState<ICarouselProps['data']>(
		[],
	);
	const [articles, setArticles] = useState<ICarouselProps['data']>([]);
	const [ads, setAds] = useState<IAdProps[]>([]);
	const [videos, setVideos] = useState<IVideoProps[]>([]);

	const getArticles = useCallback(() => {
		console.log('getting articles');
		contentful('all', fetchLimit, fetchLimit * pagination)
			.get('')
			.then((res) => {
				const structuredPosts = res.data.items?.forEach(async (cv) => {
					const contentImage =
						cv?.sys?.contentType?.sys?.id === 'newsArticle'
							? await getImage(cv?.fields?.featuredImage?.sys?.id)
							: cv?.sys?.contentType?.sys?.id === 'ads'
							? await getImage(cv?.fields?.artwork?.sys?.id)
							: cv?.sys?.contentType?.sys?.id === 'videoArticle'
							? `//i3.ytimg.com/vi/${cv.fields.youtubeId}/maxresdefault.jpg`
							: null;
					if (contentImage !== null) {
						setArticles((prev) => {
							return [
								...prev,
								{
									featured: cv.fields.featured,
									image: contentImage,
									article: cv.fields,
									type: cv?.sys?.contentType?.sys?.id,
								},
							];
						});
					}
				});
				setPosts(structuredPosts);
				setPagination(pagination);
			})
			.catch((err) => console.log('Error!!!!', err));
	}, [pagination]);

	useEffect(() => {
		getArticles();
	}, [pagination]);

	const loadMoreArticles = () => {
		console.log('pagination', pagination);
		console.log('load more articles');
		setPagination((prev) => prev + 1);
	};

	return (
		<ArticleContext.Provider
			value={{ featuredPosts, articles, ads, videos, loadMoreArticles }}
		>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticles = () => useContext(ArticleContext);

export default ArticleProvider;
