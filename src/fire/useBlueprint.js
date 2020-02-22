import { firestore } from '../services/firebase';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

export default (blueprintID) => {
  const blueprintRef = firestore.collection('blueprints').doc(blueprintID);

  const [blueprint, loading, error] = useDocumentDataOnce(blueprintRef);

  return [
    blueprint,
    loading,
    error
  ];
};