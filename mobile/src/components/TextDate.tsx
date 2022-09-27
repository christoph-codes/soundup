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
		fontSize: 14,
		color: 'grey',
		marginBottom: 0,
	},
});

export default TextDate;
