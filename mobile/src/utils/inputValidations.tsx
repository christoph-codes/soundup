import { checkRegex } from './helper';

export default {
	notEmpty: (val: any) => {
		if (val !== '') {
			return true;
		} else {
			return false;
		}
	},
	email: (val: string) => {
		return checkRegex(val, '[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+');
	},
	password: (val: string) => {
		return checkRegex(
			val,
			'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',
		);
	},
};
