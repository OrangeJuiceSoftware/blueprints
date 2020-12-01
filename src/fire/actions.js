import firebase, { firestore } from '../services/firebase';
import { filesRef, usersRef, projectsRef, Activity, File, Comment, Project, Reply } from './schema';

////////// Files //////////
export const createFileFromTemplate = ({ templateID, userID, projectID }) => {
  const contentFromTemplate = 'built from template';

  const newFile = File({
    content: contentFromTemplate,
    projectRef: projectsRef.doc(projectID),
    templateID,
    userID
  });

  return filesRef.add(newFile);
};

export const createFileFromFile = ({ cloneID, userID, projectID }) => {
  const contentFromFile = 'built from file';

  const newFile = File({
    content: contentFromFile,
    projectRef: projectsRef.doc(projectID),
    cloneID,
    userID
  });

  return filesRef.add(newFile);
};

export const updateFileContent = (id, content) => {
  const fileRef = filesRef.doc(id);
  return fileRef.update({
    content
  });
};

export const labelFile = (fileID, projectID, label) => {
  const batch = firestore.batch();

  const fileRef = filesRef.doc(fileID);
  const projectRef = projectsRef.doc(projectID);

  batch.update(fileRef, {
    labels: firebase.firestore.FieldValue.arrayUnion(label)
  });

  batch.update(projectRef, {
    labels: firebase.firestore.FieldValue.arrayUnion(label)
  });


  return batch.commit();
};

export const unlabelFile = async (fileID, projectID, label) => {
  const fileRef = filesRef.doc(fileID);
  const projectRef = projectsRef.doc(projectID);

  // No way to do this in a transaction???
  const removeLabelPromise = await fileRef.update({ labels: firebase.firestore.FieldValue.arrayRemove(label) });

  // limit to 1 so we don't unneccesarily query ourselves to $765432534.00
  const existingFileSnapshot = await filesRef.where('labels', 'array-contains', label).limit(1).get();

  // if there is no file left with that label... remove it from the project
  if (existingFileSnapshot.size === 0) {
    await projectRef.update({ labels: firebase.firestore.FieldValue.arrayRemove(label) });
  }

  return removeLabelPromise;
};

export const updateFileTitle = (id, title) => {
  const fileRef = filesRef.doc(id);
  return fileRef.update({
    title
  });
};

export const approveFile = (id, userID) => {
  const fileRef = filesRef.doc(id);

  return fileRef.update({
    approvals: firebase.firestore.FieldValue.arrayUnion(userID)
  });
};

////////// Projects //////////
export const createPersonalProject = ({ userID }) => {
  const personalOrg = Project({
    userID,
    name: 'Personal'
  });

  return projectsRef.doc(userID).set(personalOrg, { merge: true });
};

////////// Activity //////////
export const createActivity = (fileID, params) => {
  const fileRef = filesRef.doc(fileID);
  const activitiesRef = fileRef.collection('activities');

  const newActivitiy = Activity({
    ...params,
    fileRef
  });

  return activitiesRef.add(newActivitiy);
};


////////// Comments //////////
export const createComment = (fileID, params) => {
  const fileRef = filesRef.doc(fileID);
  const commentsRef = fileRef.collection('comments');

  const newComment = Comment({
    ...params,
    fileRef
  });

  commentsRef.add(newComment);
};

export const replyToComment = (fileID, commentID, params) => {
  const fileRef = filesRef.doc(fileID);
  const commentsRef = fileRef.collection('comments');
  const commentRef = commentsRef.doc(commentID);

  const newReply = Reply({
    ...params,
    fileRef,
    commentRef
  });

  commentRef.collection('replies').add(newReply);
};
