import { Text, View } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Header from '../components/Header';
const AccountSettings = ({ navigation }) => {
	const [fontsLoaded] = useFonts({
		Norwester: require('../../assets/fonts/norwester.otf'),
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<SafeAreaView style={styles.page}>
			<View alignItems={'flex-end'} style={styles.AccountSettings}>
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
					Account Settings
				</Text>
			</View>
		</SafeAreaView>
	);
};

export default AccountSettings;

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#252525',
	},
	AccountSettings: {
		backgroundColor: 'red',
		flex: 1,
		alignItems: 'center',
	},
});
