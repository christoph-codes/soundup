import { StyleSheet, Text } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';

export interface IPlaylistProps {
	url?: string;
}
const Playlist = ({
	url = 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM?si=9e65ba47b546436d',
}: IPlaylistProps) => {
	return (
		<>
			<AutoHeightWebView
				scalesPageToFit
				automaticallyAdjustContentInsets
				scrollEnabled={false}
				viewportContent={'width=device-width, user-scalable=no'}
				source={{
					uri: url,
				}}
				style={styles.Playlist}
				startInLoadingState
				renderLoading={() => <Text>isLoading...</Text>}
				renderError={(errorName) => <Text>{errorName} </Text>}
			/>
		</>
	);
};

export default Playlist;

const styles = StyleSheet.create({
	Playlist: {
		backgroundColor: 'transparent',
		width: '100%',
	},
});
