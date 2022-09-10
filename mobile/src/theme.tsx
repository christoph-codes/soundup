import { extendTheme } from 'native-base';
import { Dimensions } from 'react-native';

export default () => {
	const { width } = Dimensions.get('screen');
	const gFold = width <= 325;

	return extendTheme({
		config: {
			useSystemColorMode: true,
		},
		components: {
			View: {
				baseStyle: ({ colorMode }: any) => {
					return {
						bgColor: colorMode === 'dark' ? '#252525' : '#FFFFFF',
						width: '100%',
						height: '100%',
						fontSize: gFold ? '14px' : '16px',
					};
				},
			},
		},
		colors: {
			primary: '#252525',
			secondary: '#8DE9FE',
			gray: '#A0A0A0',
			grayWhite: '#F1F1F1',
			white: '#FFFFFF',
			danger: '#C22222',
		},
	});
};
