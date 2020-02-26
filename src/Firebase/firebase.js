import firebase from 'firebase/app';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyA6VzK_SFoh0agc4Tk53ar-cFmJEy0Dn5A',
  authDomain: 'nba-app-7e573.firebaseapp.com',
  databaseURL: 'https://nba-app-7e573.firebaseio.com',
  projectId: 'nba-app-7e573',
  storageBucket: 'nba-app-7e573.appspot.com',
  messagingSenderId: '840097377842',
  appId: '1:840097377842:web:66fdc033f0866ff2cc562b',
  measurementId: 'G-XP8VZF0W08'
};
const app = firebase.initializeApp(firebaseConfig);

export default app;
