import Stack from '../navigation';
import News from '../screens/News';
import NewsArticleContent from '../screens/NewsArticleContent';
import {
	globalScreenOptions,
	headerOptions,
} from '../utils/globalScreenOptions';

const NewsNavigation = () => {
	const newsHeaderOptions = {
		...headerOptions,
		headerTitle: 'All News',
	};
	return (
		<Stack.Navigator initialRouteName='News'>
			<Stack.Screen
				name='News'
				component={News}
				options={globalScreenOptions}
			/>
			<Stack.Screen
				name='News Article Content'
				component={NewsArticleContent}
				options={newsHeaderOptions}
			/>
		</Stack.Navigator>
	);
};

export default NewsNavigation;
