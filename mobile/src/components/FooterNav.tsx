import { View, Text } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useAuth } from '../providers/AuthProvider';

const FooterNav = ({ navigation }) => {
	const { user, logout } = useAuth();
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
			private: false,
		},
		{
			label: 'Logout',
			onClick: () => logout(navigation),
			icon: '✌🏾',
			link: 'Sign In',
			private: true,
		},
	];
	const footerLink = (item, index) => (
		<TouchableHighlight
			key={index}
			onPress={() => {
				item.onClick && item.onClick();
				item.link && navigation.navigate(item.link);
			}}
		>
			<View>
				<Text fontSize={24} lineHeight={28} textAlign={'center'}>
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
	/** If user is authenticated filter for private */
	const filteredLinks = items.filter((it) => {
		if ('private' in it && user?.authId) {
			return it.private;
		}
		if ('private' in it && !user?.authId) {
			return !it.private;
		}
		return true;
	});
	return (
		<View style={styles.FooterNav}>
			{/** TODO: Only return the private route if user is logged in. Must setup authentication */}
			{filteredLinks.map((item, idx) => {
				return footerLink(item, idx);
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
