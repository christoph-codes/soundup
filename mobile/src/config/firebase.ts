import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import fireStorage from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyB7l1NrtAoN-IYMPSt43UJ9LOWQC4yTGAc',
	authDomain: 'soundup-d411e.firebaseapp.com',
	projectId: 'soundup-d411e',
	storageBucket: 'soundup-d411e.appspot.com',
	messagingSenderId: '679984333060',
	appId: '1:679984333060:web:b7f027a563eaa2ca4d9051',
	measurementId: 'G-BDCGYCVL4W',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// TODO: Uncomment to implement analytics
// export const analytics = getAnalytics(app);
