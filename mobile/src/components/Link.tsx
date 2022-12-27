import { ReactNode, useState } from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { StyleProp } from 'react-native';

export interface ILinkProps {
	children: ReactNode;
	link: string;
	style?: StyleProp<any>;
}

const Link = ({ children, link, style }: ILinkProps) => {
	const openBrowser = async () => {
		await WebBrowser.openBrowserAsync(link, {
			toolbarColor: '#252525',
			controlsColor: '#8DE9FE',
			enableBarCollapsing: true,
			showTitle: true,
		});
	};
	return (
		<>
			<Text
				style={{ ...style }}
				onPress={() => {
					openBrowser();
				}}
			>
				{children}
			</Text>
		</>
	);
};

export default Link;
