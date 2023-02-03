import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

const P = ({ children, ...rest }) => {
	return (
		<Text style={styles.P} {...rest}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	P: {
		color: '#252525',
		marginBottom: 24,
	},
});

export default P;
