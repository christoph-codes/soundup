import Stack from '../navigation';
import Watch from '../screens/Watch';
import VideoArticleContent from '../screens/VideoArticleContent';
import {
	globalScreenOptions,
	headerOptions,
} from '../utils/globalScreenOptions';
import AuthWrapper from '../components/AuthWrapper';
import { INavigationOnly } from '../types/globalTypes';

const WatchNavigation = ({ navigation }: INavigationOnly) => {
	const watchHeaderOptions: any = {
		...headerOptions,
		headerTitle: 'All Videos',
	};
	return (
		<AuthWrapper navigation={navigation}>
			<Stack.Navigator initialRouteName='Watch'>
				<Stack.Screen
					name='Watch'
					component={Watch}
					options={globalScreenOptions}
				/>
				<Stack.Screen
					name='Video Article Content'
					component={VideoArticleContent}
					options={watchHeaderOptions}
				/>
			</Stack.Navigator>
		</AuthWrapper>
	);
};

export default WatchNavigation;
