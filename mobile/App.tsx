import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, View, Text } from 'native-base';
import theme from './src/theme';

export default function App() {
	return (
		<NativeBaseProvider theme={theme()}>
			<View flex={1} alignItems={'flex-end'} style={styles.container}>
				<Text
					color='#FFF'
					lineHeight={24}
					fontSize={24}
					textAlign='center'
					fontWeight='bold'
					textTransform={'uppercase'}
				>
					Open up App.js to start working on your app!
				</Text>
				<StatusBar style='auto' />
			</View>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
