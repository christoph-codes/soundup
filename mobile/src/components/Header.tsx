import { ReactElement } from 'react';
import { Image, View } from 'native-base';
import { StyleSheet } from 'react-native';

const Header = () => {
	return (
		<View style={styles.Header}>
			<Image
				source={require('../../assets/soundup_logo.png')}
				alt='Sound Up Logo'
			/>
			<Image
				source={require('../../assets/cog.png')}
				alt='Settings cog'
			/>
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
	},
});
