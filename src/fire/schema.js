import firebase, { firestore } from '../services/firebase';

export const blueprintsRef = firestore.collection('blueprints');
export const usersRef = firestore.collection('users');
export const organizationsRef = firestore.collection('organizations');
export const repliesGroupRef = firestore.collectionGroup('replies');
export const activitiesGroupRef = firestore.collectionGroup('activities');

export const Activity = ({ type, username, userID, blueprintRef, avatarURL }) => {
  return {
    blueprintRef,
    type,
    userID,
    username,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Blueprint = ({ templateID = null, cloneID = null, content = null, organizationRef, userID }) => {
  return {
    title: 'Untitled',
    organizationRef,
    templateID,
    cloneID,
    userID,
    content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Organization = ({ userID, name }) => {
  return {
    name,
    creatorID: userID,
    admins: [usersRef.doc(userID)],
    members: [usersRef.doc(userID)],
    labels: ['testssdfs'],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Comment = ({ body, blueprintRef, authorID, avatarURL }) => {
  return {
    body,
    blueprintRef,
    authorID,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    resolved: false,
    position: null
  };
};

export const Reply = ({ body, commentRef, blueprintRef, authorID, avatarURL }) => {
  return {
    body,
    commentRef,
    blueprintRef,
    authorID,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};
