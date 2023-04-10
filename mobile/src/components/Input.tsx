import { Dispatch, SetStateAction, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TextInputProps,
} from 'react-native';

export interface IInputProps {
	label: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	validate?: () => boolean | string;
	helperText?: string;
}

const Input = ({
	label,
	value,
	setValue,
	validate,
	helperText,
	...rest
}: IInputProps & TextInputProps) => {
	const [focus, setFocus] = useState(false);
	const [valid, setValid] = useState(null);
	const error = typeof valid === 'string';
	return (
		<View style={styles.Input}>
			<Text
				style={[
					styles.InputLabel,
					error ? styles.InputErrorTextColor : {},
				]}
			>
				{label}
			</Text>
			<TextInput
				style={[
					styles.InputField,
					error ? styles.InputFieldError : {},
					focus ? styles.InputFieldFocus : {},
				]}
				value={value}
				onFocus={() => {
					setFocus(true);
					setValid(null);
				}}
				onChangeText={setValue}
				onBlur={() => {
					validate && setValid(validate());
					setFocus(false);
				}}
				placeholderTextColor='rgba(37, 37, 37, 0.5)'
				{...rest}
			/>
			{helperText && focus && (
				<Text style={styles.InputHelperText}>{helperText}</Text>
			)}
			{valid !== null && error && (
				<Text style={styles.InputErrorTextColor}>{valid}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	Input: {
		color: '#252525',
		marginBottom: 20,
	},
	InputLabel: {
		color: '#252525',
		fontSize: 14,
		fontWeight: 'bold',
		paddingLeft: 8,
		marginBottom: 4,
	},
	InputHelperText: {
		color: '#252525',
		fontSize: 12,
		marginVertical: 4,
		paddingLeft: 8,
	},
	InputErrorTextColor: {
		color: 'red',
	},
	InputField: {
		backgroundColor: '#f1f1f1',
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	InputFieldFocus: {
		backgroundColor: 'rgba(141, 233, 254,0.1)',
	},
	InputFieldError: {
		borderColor: 'red',
	},
});

export default Input;
