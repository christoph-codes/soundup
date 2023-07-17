import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import {
	BottomTabBarProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Link from '../components/Link';
import Listen from '../screens/Listen';
import WatchNavigation from './WatchNavigation';
import NewsNavigation from './NewsNavigation';
import Home from '../screens/Home';
import FooterLink from '../components/FooterLink';
import AccountSettings from '../screens/AccountSettings';
import { globalScreenOptions } from '../utils/globalScreenOptions';
import About from '../screens/About';
import VideoArticleContent from '../screens/VideoArticleContent';
import NewsArticleContent from '../screens/NewsArticleContent';

const Tab = createBottomTabNavigator();

const AuthNavigation = () => {
	const items = [
		{
			label: 'Home',
			icon: '🏠',
			link: 'Home',
		},
		{
			label: 'News',
			icon: '📰',
			link: 'News Navigation',
		},
		{
			label: 'Watch',
			icon: '👀',
			link: 'Watch Navigation',
		},
	];

	return (
		<Tab.Navigator
			initialRouteName='Home'
			tabBar={(props: BottomTabBarProps) => (
				<View style={styles.AuthNavigation}>
					{items.map((item, idx) => (
						<FooterLink
							key={idx}
							item={item}
							navigation={props.navigation}
							currentRoute={props.state.index === idx}
							{...props}
						/>
					))}

					<Link href='https://www.soundup.media/radio'>
						<View style={styles.NavItemBtn}>
							<Text
								fontSize={24}
								lineHeight={28}
								textAlign='center'
							>
								🎧
							</Text>
							<Text
								fontSize={10}
								textTransform='uppercase'
								fontWeight='bold'
								textAlign='center'
							>
								Listen
							</Text>
							<View style={styles.NavItemIndicator} />
						</View>
					</Link>
				</View>
			)}
		>
			<Tab.Screen
				name='Home'
				component={Home}
				options={globalScreenOptions}
			/>
			<Tab.Screen
				name='News Navigation'
				component={NewsNavigation}
				options={globalScreenOptions}
			/>
			<Tab.Screen
				name='Watch Navigation'
				component={WatchNavigation}
				options={globalScreenOptions}
			/>
			<Tab.Screen
				name='Video Article Content'
				component={VideoArticleContent}
				options={globalScreenOptions}
			/>
			<Tab.Screen
				name='News Article Content'
				component={NewsArticleContent}
				options={globalScreenOptions}
			/>
			<Tab.Screen
				name='Listen'
				component={Listen}
				options={globalScreenOptions}
			/>
			<Tab.Screen
				name='Settings'
				component={AccountSettings}
				options={{ ...globalScreenOptions }}
			/>
			<Tab.Screen
				name='About'
				component={About}
				options={{
					...globalScreenOptions,
				}}
			/>
		</Tab.Navigator>
	);
};

export default AuthNavigation;

const styles = StyleSheet.create({
	AuthNavigation: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 70,
		paddingVertical: 4,
		borderTopWidth: 1,
		borderTopColor: '#161616',
	},
	NavItemBtn: {
		backgroundColor: 'transparent',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 8,
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	NavItemIndicator: {
		backgroundColor: 'transparent',
		width: 4,
		height: 4,
		borderRadius: 4,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 2,
	},
});
