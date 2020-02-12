import firebase, { firestore } from '../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import groupBy from 'lodash/groupBy';

const _generateComment = ({ body, documentRef, authorID, avatarURL }) => {
  return {
    body,
    documentRef,
    authorID,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    resolved: false,
    position: null
  };
};


const _generateReply = ({ body, commentRef, documentRef, authorID, avatarURL }) => {
  return {
    body,
    commentRef,
    documentRef,
    authorID,
    avatarURL,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export default (documentID) => {
  const documentRef = firestore.collection('files').doc(documentID);
  const commentsRef = documentRef.collection('comments');

  const commentsQuery = commentsRef.orderBy('createdAt', 'asc');
  const repliesQuery = firestore.collectionGroup('replies').where('documentRef', '==', documentRef).orderBy('createdAt', 'asc');

  const [comments = [], loadingComments, errorComments] = useCollectionData(commentsQuery, { idField: 'id' });
  const [replies = [], loadingReplies, errorReplies] = useCollectionData(repliesQuery, { idField: 'id' });

  const replyGroups = groupBy(replies, 'commentRef.id');
  const commentsTree = comments.map((comment) => {
    comment.replies = replyGroups[comment.id] || [];
    return comment;
  });

  /////////////////////////////
  ////////// actions //////////
  /////////////////////////////
  const createComment = (params) => {
    const newComment = _generateComment({
      ...params,
      documentRef
    });

    commentsRef.add(newComment);
  };

  const replyToComment = (params) => {
    const commentRef = commentsRef.doc(params.commentID);
    const newReply = _generateReply({
      ...params,
      documentRef,
      commentRef
    });

    commentRef.collection('replies').add(newReply);
  };

  return [
    commentsTree,
    loadingComments || loadingReplies,
    errorComments || errorReplies,
    {
      createComment,
      replyToComment
    }
  ];
};