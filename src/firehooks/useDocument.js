import { firestore } from '../services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

export default (documentID) => {
  const documentRef = firestore.collection('files').doc(documentID);

  // Get data
  const [document, loading, error] = useDocumentDataOnce(documentRef);

  // updaters
  const updateDocumentContent = (content) => {
    return documentRef.update({
      content
    });
  };

  const renameDocument = () => {

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