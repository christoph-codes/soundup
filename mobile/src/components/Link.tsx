import { ReactNode, useState } from 'react';
import { Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export interface ILinkProps {
	children: ReactNode;
	link: string;
}

const Link = ({ children, link }: ILinkProps) => {
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
				onPress={() => {
					openBrowser();
					console.log('openinig');
				}}
			>
				{children}
			</Text>
		</>
	);
};

export default Link;
