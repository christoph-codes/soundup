import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';
// @ts-ignore
import splashvideo from '../../assets/soundup_splash.mp4';

const styles = StyleSheet.create({
	Splash: {
		backgroundColor: '#F50f09',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});

const Splash = () => {
	return (
		<Video
			source={{ uri: splashvideo }}
			fullscreen
			fullscreenOrientation='portrait'
			style={styles.Splash}
			resizeMode='cover'
		/>
		// <Text style={styles.Splash}>Hello</Text>
	);
};

export default Splash;
