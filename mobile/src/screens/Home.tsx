import { Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
const Home = () => {
	return (
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
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		color: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
