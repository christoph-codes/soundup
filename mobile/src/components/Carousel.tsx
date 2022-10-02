import { Image, Text } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import {
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
	View,
} from 'react-native';
import ReanimatedCarousel from 'react-native-reanimated-carousel';

export interface ICarouselProps {
	data?: string[];
	style?: ViewStyle;
}

const Carousel = ({ data, style }: ICarouselProps) => {
	const width = Dimensions.get('window').width;
	const carouselRef = useRef(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const renderItem = ({ item }) => {
		return (
			<View style={{ backgroundColor: '#000', height: 200 }}>
				<Image
					source={item}
					width='100%'
					height={'200'}
					alt='Carousel Image'
				/>
			</View>
		);
	};
	useEffect(() => {
		console.log('changing?');
		console.log('activeSlide', activeSlide);
		console.log('index', carouselRef.current.getCurrentIndex());
		carouselRef.current.scrollTo(activeSlide);
	}, [activeSlide]);
	return (
		data.length > 1 && (
			<View style={style}>
				<ReanimatedCarousel
					loop
					autoPlay
					width={width}
					height={width / 2}
					data={data}
					renderItem={renderItem}
					autoPlayInterval={5000}
					ref={carouselRef}
					onSnapToItem={() =>
						setActiveSlide(carouselRef.current.getCurrentIndex())
					}
				/>
				<View style={styles.CarouselDots}>
					{data.map((_dot: any, idx: number) => (
						<TouchableOpacity
							key={idx}
							onPress={() => {
								setActiveSlide(
									carouselRef.current.getCurrentIndex(),
								);
								carouselRef.current.scrollTo(idx);
							}}
						>
							<View
								style={
									activeSlide === idx
										? styles.CarouselActiveDot
										: styles.CarouselDot
								}
							/>
						</TouchableOpacity>
					))}
				</View>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	Carousel: {},
	CarouselDots: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: -32,
		flexGap: 8,
	},
	CarouselDot: {
		backgroundColor: 'white',
		height: 20,
		width: 20,
		borderRadius: 20,
		position: 'relative',
		opacity: 0.5,
	},
	CarouselActiveDot: {
		backgroundColor: 'white',
		height: 20,
		width: 20,
		borderRadius: 20,
		opacity: 0.9,
	},
});

export default Carousel;
