import { useActionSheet } from '@expo/react-native-action-sheet';
import { ReactElement } from 'react';
import Button from './Button';

export interface IModalProps {
	buttonLabel: string;
	title: string;
	message: string;
	successLabel: string;
	successCallback: () => void;
}

const Modal = ({
	buttonLabel = 'Open Modal',
	title,
	message,
	successLabel,
	successCallback,
}: IModalProps) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const toggleModal = () => {
		const options = [successLabel, 'Cancel'];
		const successButtonIndex = 0;
		const destructiveButtonIndex = 1;
		showActionSheetWithOptions(
			{
				options,
				destructiveButtonIndex,
				title,
				message,
			},
			(selectedIndex: number) => {
				switch (selectedIndex) {
					case successButtonIndex:
						successCallback();
						// Delete
						break;

					case destructiveButtonIndex:
						// Canceled
						break;
				}
			},
		);
	};
	return <Button onPress={() => toggleModal()}>{buttonLabel}</Button>;
};

export default Modal;
