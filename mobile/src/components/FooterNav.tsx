import { View, Text } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

const FooterNav = ({ navigation }) => {
	const { user } = useAuth();
	const items = [
		{
			label: 'News',
			icon: '📰',
			link: 'News',
		},
		{
			label: 'Watch',
			icon: '👀',
			link: 'Watch',
		},
		{
			label: 'Listen',
			icon: '🎧',
			link: 'Listen',
		},
		{
			label: 'Sign In',
			icon: '🔒',
			link: 'Sign In',
		},
		{
			label: 'Logout',
			icon: '✌🏾',
			link: 'Logout',
			private: true,
		},
	];
	return (
		<View style={styles.FooterNav}>
			<Text>{user.name || 'No user is logged in'}</Text>
			{/** TODO: Only return the private route if user is logged in. Must setup authentication */}
			{items.map((item, index) => {
				if ((user.authId && item.private) || !item.private) {
					return (
						<TouchableHighlight
							key={index}
							onPress={() => navigation.navigate(item.link)}
						>
							<View>
								<Text
									fontSize={24}
									lineHeight={28}
									textAlign={'center'}
								>
									{item.icon}
								</Text>
								<Text
									fontSize={10}
									textTransform={'uppercase'}
									fontWeight='bold'
									textAlign={'center'}
								>
									{item.label}
								</Text>
							</View>
						</TouchableHighlight>
					);
				}
			})}
		</View>
	);
};

export default FooterNav;

const styles = StyleSheet.create({
	FooterNav: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 70,
		paddingVertical: 16,
		borderTopWidth: 1,
		borderTopColor: '#161616',
	},
	NavItem: {
		textAlign: 'center',
	},
});
