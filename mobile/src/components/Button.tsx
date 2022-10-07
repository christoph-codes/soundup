import {
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import { Text } from 'native-base';
import { NavigationProp } from '@react-navigation/native';

export interface IButton {
	/** Button text as a string */
	children: string;
	/** Size of the button as a string */
	size?: 'small' | 'medium';
	/** Link of the article as a string */
	link?: string;
	/** Style object that will be passed to the View component */
	style?: StyleProp<ViewStyle>[];
	/** Navigation object that is passed from the react navigation router */
	navigation?: NavigationProp<any>;
	/** Tap event that fires functions */
	onPress?: (event: GestureResponderEvent) => void;
}

const Button = ({
	children,
	size = 'medium',
	style,
	navigation,
	link,
	onPress,
	...rest
}: IButton) => {
	return (
		<TouchableOpacity
			onPress={(e) => {
				onPress(e);
				link && navigation.navigate(link);
			}}
			{...rest}
			style={[styles.Button, styles[`Button__${size}`], style]}
		>
			<Text style={[styles.ButtonText, styles[`ButtonText__${size}`]]}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	Button: {
		backgroundColor: '#8DE9FE',
		borderRadius: 100,
	},
	ButtonText: {
		color: '#252525',
		margin: 0,
		padding: 0,
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		letterSpacing: -0.5,
	},
	Button__medium: {
		paddingVertical: 8,
		paddingHorizontal: 24,
	},
	ButtonText__medium: {
		fontSize: 14,
	},
	Button__small: {
		paddingVertical: 4,
		paddingHorizontal: 24,
	},
	ButtonText__small: {
		fontSize: 12,
	},
});

export default Button;
