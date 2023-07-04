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
import SignIn from './src/screens/SignIn';
import Reauth from './src/screens/Reauth';
import CreateAccount from './src/screens/CreateAccount';
import AuthNavigation from './src/navigators/AuthNavigation';
import Header from './src/components/Header';
import { globalScreenOptions } from './src/utils/globalScreenOptions';

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
								<Stack.Navigator initialRouteName='Sign In'>
									<Stack.Screen
										name='AuthNavigation'
										component={AuthNavigation}
										options={{ headerShown: false }}
									/>
									<Stack.Screen
										name='Create Account'
										component={CreateAccount}
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
								</Stack.Navigator>
							</NavigationContainer>
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
