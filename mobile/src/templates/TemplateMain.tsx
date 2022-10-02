import { ScrollView, Text, View } from 'native-base';
import { StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import Carousel from '../components/Carousel';
import testImage from '../../assets/sliders/testImage.png';

export interface TemplateMainProps {
	navigation: NavigationProp<any>;
	carousel?: string[];
	title?: string;
	children?: any;
	style?: ViewStyle;
}

const TemplateMain = ({
	navigation,
	children,
	carousel = [testImage, testImage],
	title,
	style,
}: TemplateMainProps) => {
	const [fontsLoaded] = useFonts({
		Norwester: require('../../assets/fonts/norwester.otf'),
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<ScrollView width={'100%'} bounces={false}>
			<Carousel data={carousel} />
			<View style={[styles.Container, style]}>
				{title && (
					<Text
						fontFamily='Norwester'
						color='#252525'
						lineHeight={24}
						fontSize={24}
						fontWeight='bold'
						textTransform={'uppercase'}
						marginBottom={4}
					>
						{title}
					</Text>
				)}
				{children}
			</View>
		</ScrollView>
	);
};

export default TemplateMain;

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#252525',
	},
	TemplateMain: {
		flex: 1,
		backgroundColor: 'white',
	},
	Container: {
		backgroundColor: 'transparent',
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 16,
	},
});
