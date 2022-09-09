import { NativeBaseProvider, View, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
// import { NativeStackNavigationOptions } from '@react-navigation/stack';
import theme from './src/theme';
import Stack from './src/navigation';
import Home from './src/components/Home/Home';

const App = () => {
	const globalScreenOptions: any = {
		/** TODO: Delete once top nav is complete */
		headerShown: true,
		gestureEnabled: false,
	};

	return (
		<NativeBaseProvider theme={theme()}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen
						name='Home'
						component={Home}
						options={globalScreenOptions}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};
export default App;
