import { HStack } from 'native-base';
import { StyleSheet } from 'react-native';

const Article = ({ children, ...rest }) => {
	return (
		<HStack
			style={styles.Article}
			width={{ base: '100%', md: '49%' }}
			{...rest}
		>
			{children}
		</HStack>
	);
};

export default Article;

const styles = StyleSheet.create({
	Article: {
		paddingBottom: 16,
		marginBottom: 16,
		borderStyleBottom: 'solid',
		borderBottomColor: '#F1F1F1',
		borderBottomWidth: 1,
	},
});
