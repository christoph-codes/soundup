import { useEffect, useState } from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Link from './Link';

const FooterNav = ({ navigation }) => {
	const [currentRoute, setCurrentRoute] = useState();
	const nav: any = useNavigation();
	console.log('navigationRef', nav?.getCurrentRoute()?.name);

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
		// {
		// 	label: 'Listen',
		// 	icon: '🎧',
		// 	link: 'Listen',
		// },
	];
	const footerLink = (item, index) => (
		<TouchableHighlight
			key={index}
			onPress={() => {
				item.onClick && item.onClick();
				item.link && navigation.navigate(item.link);
			}}
		>
			<View style={styles.NavItemBtn}>
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

				{/* <View
					style={
						currentRoute === item.link
							? styles.ActiveNavItemIndicator
							: styles.NavItemIndicator
					}
				/> */}
			</View>
		</TouchableHighlight>
	);
	return (
		<View style={styles.FooterNav}>
			{items.map((item, idx) => {
				return footerLink(item, idx);
			})}

			<Link link='http://s5.radio.co/s1797f571a/listen.m3u'>
				<View style={styles.NavItemBtn}>
					<Text fontSize={24} lineHeight={28} textAlign={'center'}>
						🎧
					</Text>
					<Text
						fontSize={10}
						textTransform={'uppercase'}
						fontWeight='bold'
						textAlign={'center'}
					>
						Listen
					</Text>

					{/* <View
					style={
						currentRoute === item.link
							? styles.ActiveNavItemIndicator
							: styles.NavItemIndicator
					}
				/> */}
				</View>
			</Link>
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
		paddingVertical: 4,
		borderTopWidth: 1,
		borderTopColor: '#161616',
	},
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
