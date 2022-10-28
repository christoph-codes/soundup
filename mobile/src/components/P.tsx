import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

const P = ({ children }) => {
	return <Text style={styles.P}>{children}</Text>;
};

const styles = StyleSheet.create({
	P: {
		color: '#252525',
		marginBottom: 24,
	},
});

export default P;
