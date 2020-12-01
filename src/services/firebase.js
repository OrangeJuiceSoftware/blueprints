import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

try {
  var config = {
    apiKey: 'AIzaSyBCtZ3VbGRX1KJbemJN7ME7tktVmmPaEDM',
    authDomain: 'mermaid-v1.firebaseapp.com',
    databaseURL: 'https://mermaid-v1.firebaseio.com',
    projectId: 'mermaid-v1',
    storageBucket: 'mermaid-v1.appspot.com',
    messagingSenderId: '408272070366',
    appId: '1:408272070366:web:371e79cb5a6a943fa4044f',
    measurementId: 'G-NJ7VR55YQ4'
  };
  firebase.initializeApp(config);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();

