import { ScrollView, Text, View } from 'native-base';
import { RefreshControl, StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationProp } from '@react-navigation/native';
import Carousel, { ICarouselProps } from '../components/Carousel';
import { carouselArticles } from '../utils/mockData/carouselArticles';
import { useState } from 'react';

export interface TemplateMainProps {
	navigation?: NavigationProp<any>;
	carousel?: ICarouselProps['data'] | boolean;
	title?: string;
	children?: any;
	style?: ViewStyle;
	onRefresh?: () => void;
	onEndReach?: () => void;
}

const TemplateMain = ({
	children,
	carousel,
	title,
	style,
	onRefresh,
	onEndReach,
}: TemplateMainProps) => {
	const [refreshing, setRefreshing] = useState(false);
	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}) => {
		const paddingBottom = 32;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingBottom
		);
	};
	const onRefreshCallback = () => {
		setRefreshing(true);
		onRefresh && onRefresh();
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};
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
			scrollEventThrottle={2}
			backgroundColor='white'
			onScrollEndDrag={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent) && onEndReach) {
					onEndReach();
				}
			}}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={() => onRefreshCallback()}
				/>
			}
		>
			{carousel !== false && (
				<Carousel
					data={carousel === true ? carouselArticles : carousel}
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
