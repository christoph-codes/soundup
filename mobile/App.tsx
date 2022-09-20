import { useState, useEffect } from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/theme';
import Stack from './src/navigation';
import Home from './src/screens/Home';
import AccountSettings from './src/screens/AccountSettings';
import News from './src/screens/News';
import Watch from './src/screens/Watch';
import Listen from './src/screens/Listen';
import SignIn from './src/screens/SignIn';

const App = () => {
	const globalScreenOptions: any = {
		/** TODO: Delete once top nav is complete */
		headerShown: false,
		gestureEnabled: false,
	};
	return (
		<NativeBaseProvider theme={theme()}>
			<NavigationContainer>
				<StatusBar animated={true} barStyle='light-content' />
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen
						name='Home'
						component={Home}
						options={globalScreenOptions}
					/>
					<Stack.Screen
						name='AccountSettings'
						component={AccountSettings}
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
						name='Sign In'
						component={SignIn}
						options={globalScreenOptions}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};
export default App;
