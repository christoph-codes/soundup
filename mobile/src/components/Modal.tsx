import { useActionSheet } from '@expo/react-native-action-sheet';
import Button, { IButton } from './Button';

export interface IModalProps {
	buttonLabel: string;
	title: string;
	message: string;
	successLabel: string;
	successCallback: () => void;
	buttonVariant?: IButton['variant'];
	destroyLabel?: string;
}

const Modal = ({
	buttonLabel = 'Open Modal',
	title,
	message,
	successLabel = 'Submit',
	successCallback,
	buttonVariant,
	destroyLabel = 'Cancel',
}: IModalProps) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const toggleModal = () => {
		const options = [successLabel, destroyLabel];
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
	return (
		<Button variant={buttonVariant} onPress={() => toggleModal()}>
			{buttonLabel}
		</Button>
	);
};

export default Modal;
