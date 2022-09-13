import { Image } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	Splash: {
		flex: 1,
	},
});

const Splash = () => {
	const img = require('../../assets/splash.png');
	return <Image source={img} alt='Splash Screen' style={styles.Splash} />;
};

export default Splash;
