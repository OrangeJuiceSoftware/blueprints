import { firestore } from '../services/firebase';

export const blueprintsRef = firestore.collection('blueprints');
export const usersRef = firestore.collection('users');
export const organizationsRef = firestore.collection('organizations');
