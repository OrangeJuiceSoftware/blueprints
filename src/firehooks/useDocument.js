import { firestore } from '../services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

export default (documentID) => {
  const documentRef = firestore.collection('files').doc(documentID);

  const [document, loading, error] = useDocumentDataOnce(documentRef);

  /////////////////////////////
  ////////// actions //////////
  /////////////////////////////
  const updateDocumentContent = (content) => {
    return documentRef.update({
      content
    });
  };

  const renameDocument = (name) => {
    return documentRef.update({
      name
    });
  };

  return [
    document,
    loading,
    error,
    {
      updateDocumentContent,
      renameDocument
    }
  ];
};