import { NavigationProp } from '@react-navigation/native';
import { ReactNode, useEffect } from 'react';
import { useAuth } from '../providers/AuthProvider';

export interface IAuthWrapper {
	children: ReactNode;
	navigation: NavigationProp<any>;
}

const AuthWrapper = ({ children, navigation }: IAuthWrapper) => {
	const { user } = useAuth();

	useEffect(() => {
		if (!user.authId) {
			navigation.navigate('Sign In');
		}
	}, [user.authId, navigation]);

	if (!user.authId) {
		return null;
	}

	return <>{children}</>;
};

export default AuthWrapper;
