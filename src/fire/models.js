import firebase from 'services/firebase';

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
