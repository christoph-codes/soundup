import { HStack, IBoxProps } from 'native-base';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';

export interface IArticle {
	children: ReactNode;
}

const Article = ({ children, ...rest }: IArticle & IBoxProps) => (
	<HStack
		style={styles.Article}
		width={{ base: '100%', md: '49%' }}
		{...rest}
	>
		{children}
	</HStack>
);

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
