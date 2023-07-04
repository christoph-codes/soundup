/* eslint-disable global-require */
import { Image, View, Text } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

const Header = ({ navigation }: any) => {
	const { user } = useAuth();

	return (
		<View
			style={[styles.Header, !user.authId ? styles.Header__centered : {}]}
		>
			<TouchableHighlight
				onPress={() => {
					if (user.authId) {
						navigation.navigate('AuthNavigation');
					} else {
						navigation.navigate('Sign In');
					}
				}}
			>
				<Image
					source={require('../../assets/soundup_logo.png')}
					alt='Sound Up Logo'
				/>
			</TouchableHighlight>

			{user.name && (
				<TouchableHighlight
					style={styles.HeaderProfileIcon}
					onPress={() => {
						navigation.navigate('Settings');
					}}
				>
					<Text style={styles.HeaderProfileIconText}>
						{user.name.slice(0, 1)}
					</Text>
				</TouchableHighlight>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	Header: {
		alignContent: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 8,
		paddingHorizontal: 16,
		paddingBottom: 16,
		height: 'auto',
		backgroundColor: '#252525',
		borderBottomWidth: 1,
		borderBottomColor: '#161616',
	},
	Header__centered: {
		justifyContent: 'center',
	},
	HeaderProfileIcon: {
		backgroundColor: '#8DE9FE',
		borderRadius: 26,
		height: 26,
		width: 26,
	},
	HeaderProfileIconText: {
		textAlign: 'center',
		lineHeight: 26,
		color: '#252525',
		fontWeight: 'bold',
	},
});
