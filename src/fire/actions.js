import { blueprintsRef, usersRef, organizationsRef } from './collections';
import { Blueprint, Comment, Reply } from './models';

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

export const updateBlueprintTitle = (id, title) => {
  const blueprintRef = blueprintsRef.doc(id);
  return blueprintRef.update({
    title
  });
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
