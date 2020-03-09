import { useDocumentDataOnce, useCollectionData, useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import groupBy from 'lodash/groupBy';

import { filesRef, usersRef, projectsRef, repliesGroupRef, activitiesGroupRef } from './schema';

////////// Files //////////
export const useFile = (fileID) => useDocumentDataOnce(filesRef.doc(fileID));
export const useFiles = (projectIDs) => {
  // map the projectIDs into and array of refs
  const projectRefs = projectIDs && projectIDs.map((id) => projectsRef.doc(id));
  // need to limit this to 10
  const filesQuery = projectIDs && filesRef.where('projectRef', 'in', projectRefs).orderBy('createdAt', 'desc');
  return useCollectionDataOnce(filesQuery, { idField: 'id' });
};

////////// Activity //////////
export const useActivities = (fileID) => useCollectionData(filesRef.doc(fileID).collection('activities'), { idField: 'id' });
export const useAllActivities = (fileIDs) => {
  const fileRefs = fileIDs && fileIDs.map((id) => filesRef.doc(id));


  // need to limit this to 10
  const activitiesQuery = fileIDs && activitiesGroupRef.where('fileRef', 'in', fileRefs).orderBy('createdAt', 'desc');

  return useCollectionData(activitiesQuery, { idField: 'id' });
};

////////// Comments //////////
export const useComments = (fileID) => {
  const fileRef = filesRef.doc(fileID);
  const commentsRef = fileRef.collection('comments');

  const commentsQuery = commentsRef.orderBy('createdAt', 'asc');
  const repliesQuery = repliesGroupRef.where('fileRef', '==', fileRef).orderBy('createdAt', 'asc');

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

////////// Projects //////////
export const useProject = (projectID) => useDocumentDataOnce(projectID && projectsRef.doc(projectID), { idField: 'id' });
export const useProjects = (userID) => {
  const userRef = usersRef.doc(userID);
  const projectsQuery = projectsRef.where('members', 'array-contains', userRef);
  return useCollectionDataOnce(projectsQuery, { idField: 'id' });
};
