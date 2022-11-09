import { Text, StyleSheet } from 'react-native';

const ErrorText = ({ children }) => (
	<Text style={styles.ErrorText}>{children}</Text>
);

const styles = StyleSheet.create({
	ErrorText: {
		color: 'red',
		paddingBottom: 16,
		textAlign: 'center',
	},
});

export default ErrorText;
