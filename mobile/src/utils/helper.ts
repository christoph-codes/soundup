export const checkRegex = (value: string, expression: string): boolean => {
	const regex = new RegExp(expression);
	const isValid = regex.test(value);
	console.log('isValid Email', isValid);
	return isValid;
};
