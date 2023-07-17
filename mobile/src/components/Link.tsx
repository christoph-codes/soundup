import { ReactNode } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Pressable, IPressableProps } from 'native-base';

export interface ILinkProps {
	children: ReactNode;
	href: string;
}

const Link = ({ children, href, ...rest }: ILinkProps & IPressableProps) => {
	const openBrowser = async () => {
		await WebBrowser.openBrowserAsync(href, {
			toolbarColor: '#252525',
			controlsColor: '#8DE9FE',
			enableBarCollapsing: true,
			showTitle: true,
		});
	};
	return (
		<Pressable
			onPress={() => {
				openBrowser();
			}}
			{...rest}
		>
			{children}
		</Pressable>
	);
};

export default Link;
