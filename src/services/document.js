import { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const _generateDocument = ({ templateID = null, cloneID = null, content = null, workSpaceRef, userID }) => {
  return {
    name: null,
    workSpaceRef,
    templateID,
    cloneID,
    userID,
    content
  };
};

export default (userID) => {
  const documentsRef = firestore.collection('files');
  const myDocumentsRef = documentsRef.where('userID', '==', userID);

  // Get data
  const [documents, loading, error] = useCollectionData(myDocumentsRef, { idField: 'id' });

  // updaters
  const createDocumentFromTemplate = ({ templateID }) => {
    const contentFromTemplate = 'built from template';

    const newDocument = _generateDocument({
      content: contentFromTemplate,
      workSpaceRef: 'sdfsdf',
      templateID: templateID,
      userID: userID
    });

    return firestore.collection('files').add(newDocument);
  };

  const createDocumentFromFile = ({ cloneID }) => {
    const contentFromFile = 'built from file';

    const newDocument = _generateDocument({
      content: contentFromFile,
      workSpaceRef: 'sdfsdf',
      cloneID: cloneID,
      userID: userID
    });

    return firestore.collection('files').add(newDocument);
  };


  return [
    documents,
    loading,
    error,
    {
      createDocumentFromFile,
      createDocumentFromTemplate
    }
  ];
};