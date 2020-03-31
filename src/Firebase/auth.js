import { app as firebase } from './firebase';
import 'firebase/auth';

export const getAuth = () => {
  return firebase.auth();
};

export const googleOAuth = () => {
  return new firebase.firebase_.auth.GoogleAuthProvider();
};
