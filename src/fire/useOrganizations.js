import { firestore } from '../services/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

export default (userID) => {
  const userRef = firestore.collection('users').doc(userID);
  const organizationsRef = firestore.collection('organizations');
  const organizationsQuery = organizationsRef.where('members', 'array-contains', userRef);
  const [organizations, loading, error] = useCollectionDataOnce(organizationsQuery, { idField: 'id' });


  /////////////////////////////
  ////////// actions //////////
  /////////////////////////////

  return [
    organizations,
    loading,
    error
  ];
};