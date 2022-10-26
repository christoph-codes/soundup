import { View, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native';

export interface ILoadingProps {
	style?: ViewStyle;
	[x: string]: any;
}

const Loading = ({ style, ...rest }: ILoadingProps) => {
	return (
		<View style={[style, styles.Loading]}>
			<ActivityIndicator {...rest} />
		</View>
	);
};

const styles = StyleSheet.create({
	Loading: {
		padding: 8,
	},
});

export default Loading;
