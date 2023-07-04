import AuthWrapper from '../components/AuthWrapper';
import Stack from '../navigation';
import News from '../screens/News';
import NewsArticleContent from '../screens/NewsArticleContent';
import { INavigationOnly } from '../types/globalTypes';
import {
	globalScreenOptions,
	headerOptions,
} from '../utils/globalScreenOptions';

const NewsNavigation = ({ navigation }: INavigationOnly) => {
	const newsHeaderOptions = {
		...headerOptions,
		headerTitle: 'All News',
	};
	return (
		<AuthWrapper navigation={navigation}>
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
		</AuthWrapper>
	);
};

export default NewsNavigation;
