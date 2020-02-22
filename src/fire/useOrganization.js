import { firestore } from '../services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

export default (organizationID) => {
  const organizationRef = firestore.collection('organizations').doc(organizationID);

  const [organization, loading, error] = useDocumentDataOnce(organizationRef, { idField: 'id' });

  /////////////////////////////
  ////////// actions //////////
  /////////////////////////////

  return [
    organization,
    loading,
    error
  ];
};