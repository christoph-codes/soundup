import { Image, ScrollView, Text, View } from 'native-base';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import testImage from '../../assets/sliders/testImage.png';
import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
	const width = Dimensions.get('window').width;
	const carouselRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const [fontsLoaded] = useFonts({
		Norwester: require('../../assets/fonts/norwester.otf'),
	});
	if (!fontsLoaded) {
		return null;
	}
	const renderItem = ({ item }) => {
		return (
			<View backgroundColor='#000' height={200}>
				<Image
					source={item}
					width='100%'
					height={'200'}
					alt='Carousel Image'
				/>
			</View>
		);
	};
	return (
		<ScrollView width={'100%'} bounces={false}>
			{carousel.length > 1 && (
				<>
					<Carousel
						loop
						autoPlay
						width={width}
						height={width / 2}
						data={carousel}
						renderItem={renderItem}
						autoPlayInterval={5000}
						ref={carouselRef}
					/>
					{carousel.map((dot, idx) => (
						<TouchableOpacity
							key={idx}
							style={styles.CarouselDots}
							onPress={() =>
								setActiveSlide(
									carouselRef.current?.getCurrentIndex() + 1,
								)
							}
						>
							<Text color={idx === activeSlide ? 'red' : 'black'}>
								DOT
							</Text>
						</TouchableOpacity>
					))}
				</>
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
	CarouselDots: {},
});
