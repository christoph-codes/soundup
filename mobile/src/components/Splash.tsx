import { Image } from 'native-base';
import { StyleSheet } from 'react-native';
import splash from '../../assets/splash3.png';

const styles = StyleSheet.create({
	Splash: {
		// backgroundColor: '#F50f09',
		flex: 1,
	},
});

const Splash = () => {
	const img = require('../../assets/splash3.png');
	return <Image source={img} alt='Splash Screen' style={styles.Splash} />;
};

export default Splash;
