/* eslint-disable react/jsx-props-no-spreading */
import { NativeBaseProvider, StatusBar, View } from 'native-base';
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import theme from './src/theme';
import Stack from './src/navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthProvider from './src/providers/AuthProvider';
import Home from './src/screens/Home';
import AccountSettings from './src/screens/AccountSettings';
import News from './src/screens/News';
import NewsArticleContent from './src/screens/NewsArticleContent';
import VideoArticleContent from './src/screens/VideoArticleContent';
import Watch from './src/screens/Watch';
import Listen from './src/screens/Listen';
import SignIn from './src/screens/SignIn';
import Reauth from './src/screens/Reauth';
import CreateAccount from './src/screens/CreateAccount';
import FooterNav from './src/components/FooterNav/legacy';
import Header from './src/components/Header';
import About from './src/screens/About';
import ArticleProvider from './src/providers/ArticleProvider';
import { BottomTabs } from './src/components/FooterNav/navigator';

const App = () => {
	const navigationRef = useNavigationContainerRef();

	const globalScreenOptions: any = {
		/** TODO: Delete once top nav is complete */
		headerShown: false,
		gestureEnabled: false,
	};
	const headerOptions: any = {
		headerStyle: {
			backgroundColor: '#252525',
			border: 0,
		},
		headerTintColor: '#fff',
		headerTitle: '',
	};

	return (
		<NativeBaseProvider theme={theme()}>
			<ActionSheetProvider>
				<AuthProvider>
					{/* <ArticleProvider> */}
					<SafeAreaView style={styles.page}>
						<View style={styles.TemplateMain}>
							<NavigationContainer ref={navigationRef}>
								<Header navigation={navigationRef} />
								<StatusBar
									animated={true}
									barStyle='light-content'
								/>
								<Stack.Navigator initialRouteName='Dashboard'>
									<Stack.Screen
										name='Create Account'
										component={CreateAccount}
										options={globalScreenOptions}
									/>
									<Stack.Screen
										name='Account Settings'
										component={AccountSettings}
										options={globalScreenOptions}
									/>
									<Stack.Screen
										name='Sign In'
										component={SignIn}
										options={globalScreenOptions}
									/>
									<Stack.Screen
										name='Reauth'
										component={Reauth}
										options={globalScreenOptions}
									/>
									<Stack.Screen
										name='About'
										component={About}
										options={globalScreenOptions}
									/>
									<Stack.Screen
										name='Dashboard'
									>
										{(props) => <BottomTabs {...props} options={globalScreenOptions} />}
									</Stack.Screen>
								</Stack.Navigator>
								<FooterNav navigation={navigationRef} />
							</NavigationContainer>
						</View>
					</SafeAreaView>
					{/* </ArticleProvider> */}
				</AuthProvider>
			</ActionSheetProvider>
		</NativeBaseProvider>
	);
};
export default App;

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#252525',
	},
	TemplateMain: {
		flex: 1,
		backgroundColor: 'white',
	},
	Container: {
		backgroundColor: 'transparent',
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 16,
	},
});
/* <Stack.Screen
name='Home'
component={Home}
options={globalScreenOptions}
/>
<Stack.Screen
name='News'
component={News}
options={globalScreenOptions}
/>
<Stack.Screen
name='Watch'
component={Watch}
options={globalScreenOptions}
/>
<Stack.Screen
name='Listen'
component={Listen}
options={globalScreenOptions}
/>
<Stack.Screen
name='News Article Content'
component={NewsArticleContent}
options={headerOptions}
/>
<Stack.Screen
name='Video Article Content'
component={VideoArticleContent}
options={headerOptions}
/> */
