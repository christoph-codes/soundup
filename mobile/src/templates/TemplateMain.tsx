import { ScrollView, Text, View } from 'native-base';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';
import Header from '../components/Header';
import FooterNav from '../components/FooterNav';
import { NavigationProp } from '@react-navigation/native';

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
	carousel = [],
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
		<SafeAreaView style={styles.page}>
			<View style={styles.TemplateMain}>
				<Header navigation={navigation} />
				<ScrollView width={'100%'}>
					{carousel.length < 1 && (
						<View
							color='#c60000'
							backgroundColor='#000'
							height={200}
						>
							<Text>Carousel Placeholder</Text>
						</View>
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
							>
								{title}
							</Text>
						)}
						{children}
					</View>
				</ScrollView>
				<FooterNav navigation={navigation} />
			</View>
		</SafeAreaView>
	);
};

export default TemplateMain;

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#252525',
	},
	TemplateMain: {
		backgroundColor: '#252525',
		flex: 1,
	},
	Container: {
		flex: 1,
		padding: 16,
	},
});
