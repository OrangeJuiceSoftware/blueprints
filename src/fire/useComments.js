import firebase, { firestore } from '../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import groupBy from 'lodash/groupBy';

export default (blueprintID) => {
  const blueprintRef = firestore.collection('blueprints').doc(blueprintID);
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