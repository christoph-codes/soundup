import { Text } from 'native-base';
import { StyleSheet } from 'react-native';

const TextDate = ({ date }) => {
	return (
		<Text style={styles.TextDate}>
			{new Date(date).toLocaleString('en').split(',')[0]}
		</Text>
	);
};

const styles = StyleSheet.create({
	TextDate: {
		fontSize: 12,
		color: '#C0C0C0',
		marginBottom: 0,
	},
});

export default TextDate;
