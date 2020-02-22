import { firestore } from 'services/firebase';
import { useDocumentDataOnce, useCollectionData, useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import groupBy from 'lodash/groupBy';

import { blueprintsRef, usersRef, organizationsRef } from './collections';

////////// Blueprints //////////
export const useBlueprint = (blueprintID) => useDocumentDataOnce(blueprintsRef.doc(blueprintID));
export const useBlueprints = (organizationIDs) => {
  // map the organizationIDs into and array of refs
  const organizationRefs = organizationIDs && organizationIDs.map((id) => organizationsRef.doc(id));
  const blueprintsQuery = organizationIDs && blueprintsRef.where('organizationRef', 'in', organizationRefs).orderBy('createdAt', 'desc');
  return useCollectionDataOnce(blueprintsQuery, { idField: 'id' });
};

////////// Comments //////////
export const useComments = (blueprintID) => {
  const blueprintRef = blueprintsRef.doc(blueprintID);
  const commentsRef = blueprintRef.collection('comments');

  const commentsQuery = commentsRef.orderBy('createdAt', 'asc');
  const repliesQuery = firestore.collectionGroup('replies').where('blueprintRef', '==', blueprintRef).orderBy('createdAt', 'asc');

  const [comments = [], loadingComments, errorComments] = useCollectionData(commentsQuery, { idField: 'id' });
  const [replies = [], loadingReplies, errorReplies] = useCollectionData(repliesQuery, { idField: 'id' });

  const replyGroups = groupBy(replies, 'commentRef.id');
  const commentsTree = comments.map((comment) => {
    comment.replies = replyGroups[comment.id] || [];
    return comment;
  });

  return [
    commentsTree,
    loadingComments || loadingReplies,
    errorComments || errorReplies
  ];
};

////////// Organizations //////////
export const useOrganization = (organizationID) => useDocumentDataOnce(organizationsRef.doc(organizationID));
export const useOrganizations = (userID) => {
  const userRef = usersRef.doc(userID);
  const organizationsQuery = organizationsRef.where('members', 'array-contains', userRef);
  return useCollectionDataOnce(organizationsQuery, { idField: 'id' });
};
