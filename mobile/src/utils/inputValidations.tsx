import { checkRegex } from './helper';

export default {
	notEmpty: (val: any) => {
		if (val !== '') {
			return true;
		} else {
			return false;
		}
	},
	email: (val: string): boolean | string => {
		if (checkRegex(val, '[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+')) {
			return true;
		} else {
			return 'Please enter a valid email address';
		}
	},
	password: (val: string) => {
		if (
			checkRegex(
				val,
				'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
			)
		) {
			return true;
		} else {
			return 'Please enter a valid password.';
		}
	},
};
