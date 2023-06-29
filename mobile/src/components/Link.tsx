import { ReactNode } from 'react';
import { Text, StyleProp } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export interface ILinkProps {
	children: ReactNode;
	href: string;
	style?: StyleProp<any>;
}

const Link = ({ children, href, style = false }: ILinkProps) => {
	const openBrowser = async () => {
		await WebBrowser.openBrowserAsync(href, {
			toolbarColor: '#252525',
			controlsColor: '#8DE9FE',
			enableBarCollapsing: true,
			showTitle: true,
		});
	};
	return (
		<Text
			style={{ ...style }}
			onPress={() => {
				openBrowser();
			}}
		>
			{children}
		</Text>
	);
};

export default Link;
