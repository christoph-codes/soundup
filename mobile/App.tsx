import { NativeBaseProvider, StatusBar, View } from 'native-base';
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import theme from './src/theme';
import Stack from './src/navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthProvider from './src/providers/AuthProvider';
import Home from './src/screens/Home';
import AccountSettings from './src/screens/AccountSettings';
import News from './src/screens/News';
import NewsArticleContent from './src/screens/NewsArticleContent';
import Watch from './src/screens/Watch';
import Listen from './src/screens/Listen';
import SignIn from './src/screens/SignIn';
import Reauth from './src/screens/Reauth';
import CreateAccount from './src/screens/CreateAccount';
import FooterNav from './src/components/FooterNav';
import Header from './src/components/Header';
import About from './src/screens/About';
import ArticleProvider from './src/providers/ArticleProvider';

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
			<AuthProvider>
				<ArticleProvider>
					<SafeAreaView style={styles.page}>
						<View style={styles.TemplateMain}>
							<Header navigation={navigationRef} />
							<NavigationContainer ref={navigationRef}>
								<StatusBar
									animated={true}
									barStyle='light-content'
								/>

								<Stack.Navigator initialRouteName='Home'>
									<Stack.Screen
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
										name='News Article Content'
										component={NewsArticleContent}
										options={headerOptions}
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
								</Stack.Navigator>
							</NavigationContainer>
							<FooterNav navigation={navigationRef} />
						</View>
					</SafeAreaView>
				</ArticleProvider>
			</AuthProvider>
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
