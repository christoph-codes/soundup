import { useActionSheet } from '@expo/react-native-action-sheet';
import Button from './Button';

export interface IModalProps {
	buttonLabel: string;
}

const Modal = ({ buttonLabel = 'Open Modal' }: IModalProps) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const toggleModal = () => {
		const options = ['Jax', 'Save', 'Cancel'];
		const destructiveButtonIndex = 0;
		const cancelButtonIndex = 2;
		showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
				destructiveButtonIndex,
			},
			(selectedIndex: number) => {
				switch (selectedIndex) {
					case 1:
						// Save
						break;

					case destructiveButtonIndex:
						// Delete
						break;

					case cancelButtonIndex:
					// Canceled
				}
			},
		);
		console.log('hello');
	};
	return <Button onPress={() => toggleModal()}>{buttonLabel}</Button>;
};

export default Modal;
