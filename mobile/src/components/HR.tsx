import { StyleSheet, View } from 'react-native';

const HR = () => {
	return <View style={[styles.HR]} />;
};

const styles = StyleSheet.create({
	HR: {
		height: 2,
		backgroundColor: '#f1f1f1',
		marginVertical: 16,
	},
});

export default HR;
