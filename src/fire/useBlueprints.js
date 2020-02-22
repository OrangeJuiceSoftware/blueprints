import firebase, { firestore } from '../services/firebase';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

const _generateBlueprint = ({ templateID = null, cloneID = null, content = null, organizationRef, userID }) => {
  return {
    title: 'Untitled',
    organizationRef,
    templateID,
    cloneID,
    userID,
    content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
};

export default (organizationIDs) => {
  // map the organizationIDs into and array of refs
  const organizationRefs = organizationIDs.map((id) => firestore.collection('organizations').doc(id));

  const blueprintsRef = firestore.collection('blueprints');
  const myBlueprintsQuery = organizationRefs.length ? blueprintsRef.where('organizationRef', 'in', organizationRefs).orderBy('createdAt', 'desc') : null;

  const [blueprint, loading, error] = useCollectionDataOnce(myBlueprintsQuery, { idField: 'id' });
  console.log(error);


  /////////////////////////////
  ////////// actions //////////
  /////////////////////////////
  const createBlueprintFromTemplate = ({ templateID, userID, organizationRef }) => {
    const contentFromTemplate = 'built from template';

    const newBlueprint = _generateBlueprint({
      content: contentFromTemplate,
      organizationRef,
      templateID,
      userID
    });

    return firestore.collection('blueprints').add(newBlueprint);
  };

  const createBlueprintFromFile = ({ cloneID, userID, organizationRef }) => {
    const contentFromFile = 'built from file';

    const newBlueprint = _generateBlueprint({
      content: contentFromFile,
      organizationRef,
      cloneID,
      userID
    });

    return firestore.collection('blueprints').add(newBlueprint);
  };


  return [
    blueprint,
    loading,
    error,
    {
      createBlueprintFromFile,
      createBlueprintFromTemplate
    }
  ];
};