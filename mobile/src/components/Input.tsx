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
	validate?: () => boolean;
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
	return (
		<View style={styles.Input}>
			<Text
				style={[
					styles.InputLabel,
					valid === false ? styles.InputLabelError : {},
				]}
			>
				{label}
			</Text>
			<TextInput
				style={[
					styles.InputField,
					valid === false ? styles.InputFieldError : {},
					focus ? styles.InputFieldFocus : {},
				]}
				value={value}
				onFocus={() => {
					setFocus(true);
					setValid(null);
				}}
				onChangeText={setValue}
				onBlur={() => {
					setValid(validate());
					setFocus(false);
				}}
				{...rest}
			/>
			{helperText && focus && (
				<Text style={styles.InputHelperText}>{helperText}</Text>
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
		fontSize: 16,
		fontWeight: 'bold',
		paddingLeft: 16,
		marginBottom: 8,
	},
	InputHelperText: {
		color: '#252525',
		fontSize: 12,
		marginVertical: 4,
		paddingLeft: 16,
	},
	InputLabelError: {
		color: 'red',
	},
	InputField: {
		backgroundColor: '#ffffff',
		padding: 16,
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
