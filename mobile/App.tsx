import { useState, useEffect } from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/theme';
import Stack from './src/navigation';
import Home from './src/screens/Home';
import Splash from './src/components/Splash';

const App = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 100);
	}, []);

	const globalScreenOptions: any = {
		/** TODO: Delete once top nav is complete */
		headerShown: false,
		gestureEnabled: false,
	};
	return (
		<NativeBaseProvider theme={theme()}>
			{!loading ? (
				<>
					<StatusBar animated={true} barStyle='light-content' />
					<Splash />
				</>
			) : (
				<NavigationContainer>
					<StatusBar animated={true} barStyle='light-content' />
					<Stack.Navigator initialRouteName='Home'>
						<Stack.Screen
							name='Home'
							component={Home}
							options={globalScreenOptions}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			)}
		</NativeBaseProvider>
	);
};
export default App;
