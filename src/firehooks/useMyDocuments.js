import firebase, { firestore } from '../services/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const _generateDocument = ({ templateID = null, cloneID = null, content = null, workSpaceRef, userID }) => {
  return {
    name: 'Untitled',
    workSpaceRef,
    templateID,
    cloneID,
    userID,
    content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export default (userID) => {
  const documentsRef = firestore.collection('files');
  const myDocumentsRef = documentsRef.where('userID', '==', userID).orderBy('createdAt', 'desc');

  const [documents, loading, error] = useCollectionDataOnce(myDocumentsRef, { idField: 'id' });

  /////////////////////////////
  ////////// actions //////////
  /////////////////////////////
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