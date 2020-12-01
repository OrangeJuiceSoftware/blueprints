import firebase, { firestore } from '../services/firebase';

export const filesRef = firestore.collection('files');
export const usersRef = firestore.collection('users');
export const projectsRef = firestore.collection('projects');
export const repliesGroupRef = firestore.collectionGroup('replies');
export const activitiesGroupRef = firestore.collectionGroup('activities');

export const Activity = ({ type, username, userID, fileRef, avatarURL }) => {
  return {
    fileRef,
    type,
    userID,
    username,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const File = ({ templateID = null, cloneID = null, content = null, projectRef, userID }) => {
  return {
    title: 'Untitled',
    projectRef,
    templateID,
    cloneID,
    userID,
    content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Project = ({ userID, name }) => {
  return {
    name,
    creatorID: userID,
    admins: [usersRef.doc(userID)],
    members: [usersRef.doc(userID)],
    labels: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export const Comment = ({ body, fileRef, authorID, avatarURL }) => {
  return {
    body,
    fileRef,
    authorID,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    resolved: false,
    position: null
  };
};

export const Reply = ({ body, commentRef, fileRef, authorID, avatarURL }) => {
  return {
    body,
    commentRef,
    fileRef,
    authorID,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};
