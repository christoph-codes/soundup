import { Text, View } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Header from '../components/Header';
const Home = ({ navigation }) => {
	const [fontsLoaded] = useFonts({
		Norwester: require('../../assets/fonts/norwester.otf'),
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<SafeAreaView style={styles.page}>
			<View alignItems={'flex-end'} style={styles.Home}>
				<Header navigation={navigation} />
				<Text
					fontFamily='Norwester'
					color='#FFF'
					lineHeight={24}
					fontSize={24}
					textAlign='center'
					fontWeight='bold'
					textTransform={'uppercase'}
				>
					Home
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#252525',
	},
	Home: {
		backgroundColor: 'red',
		flex: 1,
		alignItems: 'center',
	},
});
