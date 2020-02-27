import { useDocumentDataOnce, useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import groupBy from 'lodash/groupBy';

import { blueprintsRef, usersRef, organizationsRef, repliesGroupRef, activitiesGroupRef } from './schema';

////////// Blueprints //////////
export const useBlueprint = (blueprintID) => useDocumentDataOnce(blueprintsRef.doc(blueprintID));
export const useBlueprints = (organizationIDs) => {
  // map the organizationIDs into and array of refs
  const organizationRefs = organizationIDs && organizationIDs.map((id) => organizationsRef.doc(id));
  // need to limit this to 10
  const blueprintsQuery = organizationIDs && blueprintsRef.where('organizationRef', 'in', organizationRefs).orderBy('createdAt', 'desc');
  return useCollectionDataOnce(blueprintsQuery, { idField: 'id' });
};

////////// Activity //////////
export const useActivities = (blueprintID) => useCollectionData(blueprintsRef.doc(blueprintID).collection('activities'), { idField: 'id' });
export const useAllActivities = (blueprintIDs) => {
  const blueprintRefs = blueprintIDs && blueprintIDs.map((id) => blueprintsRef.doc(id));


  // need to limit this to 10
  const activitiesQuery = blueprintIDs && activitiesGroupRef.where('blueprintRef', 'in', blueprintRefs).orderBy('createdAt', 'desc');

  return useCollectionData(activitiesQuery, { idField: 'id' });
};

////////// Comments //////////
export const useComments = (blueprintID) => {
  const blueprintRef = blueprintsRef.doc(blueprintID);
  const commentsRef = blueprintRef.collection('comments');

  const commentsQuery = commentsRef.orderBy('createdAt', 'asc');
  const repliesQuery = repliesGroupRef.where('blueprintRef', '==', blueprintRef).orderBy('createdAt', 'asc');

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
export const useOrganization = (organizationID) => useDocumentDataOnce(organizationID && organizationsRef.doc(organizationID));
export const useOrganizations = (userID) => {
  const userRef = usersRef.doc(userID);
  const organizationsQuery = organizationsRef.where('members', 'array-contains', userRef);
  return useCollectionDataOnce(organizationsQuery, { idField: 'id' });
};
