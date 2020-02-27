import firebase, { firestore } from '../services/firebase';
import { blueprintsRef, usersRef, organizationsRef, Activity, Blueprint, Comment, Reply } from './schema';

////////// Blueprints //////////
export const createBlueprintFromTemplate = ({ templateID, userID, organizationID }) => {
  const contentFromTemplate = 'built from template';

  const newBlueprint = Blueprint({
    content: contentFromTemplate,
    organizationRef: organizationsRef.doc(organizationID),
    templateID,
    userID
  });

  return blueprintsRef.add(newBlueprint);
};

export const createBlueprintFromFile = ({ cloneID, userID, organizationID }) => {
  const contentFromFile = 'built from file';

  const newBlueprint = Blueprint({
    content: contentFromFile,
    organizationRef: organizationsRef.doc(organizationID),
    cloneID,
    userID
  });

  return blueprintsRef.add(newBlueprint);
};

export const updateBlueprintContent = (id, content) => {
  const blueprintRef = blueprintsRef.doc(id);
  return blueprintRef.update({
    content
  });
};

export const labelBlueprint = (blueprintID, organizationID, label) => {
  const batch = firestore.batch();

  const blueprintRef = blueprintsRef.doc(blueprintID);
  const organizationRef = organizationsRef.doc(organizationID);

  batch.update(blueprintRef, {
    labels: firebase.firestore.FieldValue.arrayUnion(label)
  });

  batch.update(organizationRef, {
    labels: firebase.firestore.FieldValue.arrayUnion(label)
  });


  return batch.commit();
};

export const unlabelBlueprint = async (blueprintID, organizationID, label) => {
  const blueprintRef = blueprintsRef.doc(blueprintID);
  const organizationRef = organizationsRef.doc(organizationID);

  // No way to do this in a transaction???
  const removeLabelPromise = await blueprintRef.update({ labels: firebase.firestore.FieldValue.arrayRemove(label) });

  // limit to 1 so we don't unneccesarily query ourselves to $765432534.00
  const existingBlueprintSnapshot = await blueprintsRef.where('labels', 'array-contains', label).limit(1).get();

  // if there is no blueprint left with that label... remove it from the organization
  if (existingBlueprintSnapshot.size === 0) {
    await organizationRef.update({ labels: firebase.firestore.FieldValue.arrayRemove(label) });
  }

  return removeLabelPromise;
};

export const updateBlueprintTitle = (id, title) => {
  const blueprintRef = blueprintsRef.doc(id);
  return blueprintRef.update({
    title
  });
};

export const approveBlueprint = (id, userID) => {
  const blueprintRef = blueprintsRef.doc(id);

  return blueprintRef.update({
    approvals: firebase.firestore.FieldValue.arrayUnion(userID)
  });
};

////////// Activity //////////
export const createActivity = (blueprintID, params) => {
  const blueprintRef = blueprintsRef.doc(blueprintID);
  const activitiesRef = blueprintRef.collection('activities');

  const newActivitiy = Activity({
    ...params,
    blueprintRef
  });

  return activitiesRef.add(newActivitiy);
};


////////// Comments //////////
export const createComment = (blueprintID, params) => {
  const blueprintRef = blueprintsRef.doc(blueprintID);
  const commentsRef = blueprintRef.collection('comments');

  const newComment = Comment({
    ...params,
    blueprintRef
  });

  commentsRef.add(newComment);
};

export const replyToComment = (blueprintID, commentID, params) => {
  const blueprintRef = blueprintsRef.doc(blueprintID);
  const commentsRef = blueprintRef.collection('comments');
  const commentRef = commentsRef.doc(commentID);

  const newReply = Reply({
    ...params,
    blueprintRef,
    commentRef
  });

  commentRef.collection('replies').add(newReply);
};
