import { createContext, useContext, useState } from 'react';
import {
	ApiConfig,
	ApiScope,
	auth,
	PlayerContext,
	PlayerState,
	remote,
	SpotifyAuth,
	SpotifyRemoteApi,
} from 'react-native-spotify-remote';

export interface IAuthOptions {
	playURI?: string;
	showDialog?: boolean;
	autoConnect?: boolean;
	authType?: ApiConfig['authType'];
}

export interface AppContextState {
	error?: Error & { code?: any };
	playerState?: PlayerState;
	token?: string;
	isConnected?: boolean;
	children?: any;
}

export interface ISpotifyContextProps extends AppContextState {
	onError: (err: Error) => void;
	authenticate: (options?: IAuthOptions) => void;
	clearError: () => void;
	endSession: () => void;
	remote: SpotifyRemoteApi;
	auth: SpotifyAuth;
}

const noop = () => {};
const DefaultContext: ISpotifyContextProps = {
	onError: noop,
	authenticate: noop,
	clearError: noop,
	endSession: noop,
	remote,
	auth,
};
const SpotifyContext = createContext<ISpotifyContextProps>(DefaultContext);

const SpotifyProvider = ({ children }: AppContextState) => {
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState(undefined);
	const [token, setToken] = useState('');
	const [playerState, setPlayerState] = useState<PlayerState>();
	const [playerContext, setPlayerContext] = useState<PlayerContext>();

	const onError = (error: Error) => {
		setError(error);
	};
	const clearError = () => {
		setError(undefined);
	};
	const onConnected = () => {
		setIsConnected(true);
	};
	const onDisconnected = () => {
		setIsConnected(false);
	};
	const onPlayerStateChanged = (playerState: PlayerState) => {
		setPlayerState(playerState);
	};
	const onPlayerContextChanged = (playerContext: PlayerContext) => {
		setPlayerContext(playerContext);
	};
	const endSession = () => {
		auth.endSession().then(() => {
			setIsConnected(false);
			setToken(undefined);
		});
	};

	/** Authenticate a user to properly play a spotify playlist */
	const authenticate = async ({
		playURI,
		showDialog = false,
		authType,
	}: IAuthOptions = {}) => {
		const config: ApiConfig = {
			clientID: process.env.SPOTIFY_CLIENT_ID,
			redirectURL: process.env.SPOTIFY_REDIRECT_URL,
			tokenRefreshURL: process.env.SPOTIFY_TOKEN_REFRESH_URL,
			tokenSwapURL: process.env.SPOTIFY_TOKEN_SWAP_URL,
			scopes: [ApiScope.AppRemoteControlScope],
			playURI,
			showDialog,
			authType,
		};

		try {
			// Go and check if things are connected
			const isUserConnected = await remote.isConnectedAsync();
			setIsConnected(isUserConnected);

			// Initialize the session
			const { accessToken: userToken } = await auth.authorize(config);
			setToken(userToken);
			await remote.connect(userToken);
		} catch (err) {
			onError(err);
		}
	};
	return (
		<SpotifyContext.Provider
			value={{
				...DefaultContext,
				onError,
				authenticate,
				clearError,
				endSession,
				isConnected,
			}}
		>
			{children}
		</SpotifyContext.Provider>
	);
};

export const useSpotify = () => useContext(SpotifyContext);

export default SpotifyProvider;
