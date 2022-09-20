import { Image, View } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';

const Header = ({ navigation }) => {
	return (
		<View style={styles.Header}>
			<TouchableHighlight onPress={() => navigation.push('Home')}>
				<Image
					source={require('../../assets/soundup_logo.png')}
					alt='Sound Up Logo'
				/>
			</TouchableHighlight>
			<TouchableHighlight
				onPress={() => navigation.push('AccountSettings')}
			>
				<Image
					source={require('../../assets/cog.png')}
					alt='Settings cog'
				/>
			</TouchableHighlight>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	Header: {
		alignContent: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 16,
		height: 'auto',
		backgroundColor: '#252525',
		borderBottomWidth: 1,
		borderBottomColor: '#161616',
	},
});
