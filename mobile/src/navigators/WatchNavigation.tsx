import Stack from '../navigation';
import Watch from '../screens/Watch';
import VideoArticleContent from '../screens/VideoArticleContent';
import {
	globalScreenOptions,
	headerOptions,
} from '../utils/globalScreenOptions';

const WatchNavigation = () => {
	const watchHeaderOptions: any = {
		...headerOptions,
		headerTitle: 'All Videos',
	};
	return (
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
	);
};

export default WatchNavigation;
