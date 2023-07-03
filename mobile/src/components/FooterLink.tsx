import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, View } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';

export interface IFooterLink {
	navigation?: BottomTabBarProps['navigation'];
	item: {
		label: string;
		icon: string;
		link: string;
		onClick?: () => void;
	};
	currentRoute: boolean;
}

const FooterLink = ({ navigation, item, currentRoute }: IFooterLink) => (
	<TouchableHighlight
		onPress={() => {
			if (item?.onClick) {
				item.onClick();
			}
			if (item?.link) {
				navigation.navigate(item.link);
			}
		}}
	>
		<View style={styles.NavItemBtn}>
			<Text fontSize={24} lineHeight={28} textAlign='center'>
				{item.icon}
			</Text>
			<Text
				fontSize={10}
				textTransform='uppercase'
				fontWeight='bold'
				textAlign='center'
			>
				{item.label}
			</Text>

			<View
				style={
					currentRoute
						? styles.ActiveNavItemIndicator
						: styles.NavItemIndicator
				}
			/>
		</View>
	</TouchableHighlight>
);

export default FooterLink;

const styles = StyleSheet.create({
	NavItemBtn: {
		backgroundColor: 'transparent',
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 8,
		borderRadius: 8,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	NavItemIndicator: {
		backgroundColor: 'transparent',
		width: 4,
		height: 4,
		borderRadius: 4,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 2,
	},
	ActiveNavItemIndicator: {
		backgroundColor: '#8DE9FE',
		width: 4,
		height: 4,
		borderRadius: 4,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 2,
	},
});
