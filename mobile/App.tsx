import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
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
				<StatusBar animated={true} barStyle='dark-content' />
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
