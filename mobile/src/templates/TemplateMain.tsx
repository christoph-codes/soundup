import { ScrollView, Text, View } from 'native-base';
import { StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import Carousel, { ICarouselProps } from '../components/Carousel';
import { carouselArticles } from '../utils/mockData/carouselArticles';

export interface TemplateMainProps {
	navigation?: NavigationProp<any>;
	carousel?: ICarouselProps['data'] | boolean;
	title?: string;
	children?: any;
	style?: ViewStyle;
}

const TemplateMain = ({
	navigation,
	children,
	carousel,
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
		<ScrollView
			showsVerticalScrollIndicator={false}
			width={'100%'}
			bounces={false}
			backgroundColor='white'
		>
			{carousel !== false && (
				<Carousel
					data={
						carousel === true
							? carouselArticles
							: carousel.slice(0, 5)
					}
				/>
			)}
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
						marginTop={4}
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
		backgroundColor: 'transparent',
	},
	Container: {
		backgroundColor: 'transparent',
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
		paddingBottom: 16,
	},
});
