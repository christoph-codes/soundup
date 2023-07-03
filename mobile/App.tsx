import { NativeBaseProvider, View } from 'native-base';
import {
	NavigationContainer,
	useNavigationContainerRef,
} from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from './src/theme';
import AuthProvider from './src/providers/AuthProvider';
import AccountSettings from './src/screens/AccountSettings';
// import NewsArticleContent from './src/screens/NewsArticleContent';
import SignIn from './src/screens/SignIn';
import Reauth from './src/screens/Reauth';
import CreateAccount from './src/screens/CreateAccount';
import FooterNav from './src/components/FooterNav';
import Header from './src/components/Header';
import About from './src/screens/About';
import {
	globalScreenOptions,
	headerOptions,
} from './src/utils/globalScreenOptions';

const Stack = createNativeStackNavigator();

const App = () => {
	const navigationRef = useNavigationContainerRef();

	return (
		<NativeBaseProvider theme={theme()}>
			<ActionSheetProvider>
				<AuthProvider>
					<SafeAreaView style={styles.page}>
						<View style={styles.TemplateMain}>
							<Header navigation={navigationRef} />
							<StatusBar animated barStyle='light-content' />
							<NavigationContainer ref={navigationRef}>
								<Stack.Navigator>
									<Stack.Screen
										name='FooterNav'
										component={FooterNav}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name='Create Account'
										component={CreateAccount}
										options={{
											...headerOptions,
											headerShown: true,
											headerTitle: 'Sign In',
										}}
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
							{/* <NavigationContainer ref={navigationRef}>
								<Header navigation={navigationRef} />
								<StatusBar animated barStyle='light-content' />
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
								<FooterNav navigation={navigationRef} />
							</NavigationContainer> */}
						</View>
					</SafeAreaView>
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
