import { View, Text } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useAuth } from '../providers/AuthProvider';

const FooterNav = ({ navigation }) => {
	const { user } = useAuth();
	const items = [
		{
			label: 'Home',
			icon: '🏠',
			link: 'Home',
		},
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
	return (
		<View style={styles.FooterNav}>
			{items.map((item, idx) => {
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
