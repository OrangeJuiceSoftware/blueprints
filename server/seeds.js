const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mermaid-v1.firebaseio.com'
});

const firestore = admin.firestore();

const seedFunction = async () => {
  const userRef = firestore.collection('users').doc('DiNO4M1YsgPgm8hg3c5m');

  // const organizationDoc = await firestore.collection('organizations').add({
  //   name: 'Orange Juice',
  //   creator: userRef,
  //   members: {
  //     'DiNO4M1YsgPgm8hg3c5m': firestore.collection('users').doc('DiNO4M1YsgPgm8hg3c5m')
  //   }
  // });

  // const teamDoc = await firestore.collection('teams').add({
  //   name: 'Tropicana Boyz',
  //   creator: userRef,
  //   organizationRef: organizationDoc,
  //   members: {
  //     'DiNO4M1YsgPgm8hg3c5m': firestore.collection('users').doc('DiNO4M1YsgPgm8hg3c5m')
  //   }
  // });

  const personalWorkSpaceDoc = await firestore.collection('workspaces').add({
    name: 'Eric\'s Personal Workspace',
    creator: userRef,
    organizationRef: null,
    public: false,
    teams: {
      // 'Af29j2f0sF4wfefwe3rw': firestore.collection('teams').doc('Af29j2f0sF4wfefwe3rw')
    },
    collaborators: {
      'DiNO4M1YsgPgm8hg3c5m': firestore.collection('users').doc('P8VSjFSeduaoP3ELW3V6UuA9erR2')
    }
  });

  [1, 2, 3, 4, 5].forEach(async (number) => {
    // const directoryDoc = await firestore.collection('directories').add({
    //   workspaceRef: personalWorkSpaceDoc,
    //   parentRef: null,
    //   name: `My Directory ${number}`
    // });

    // await firestore.collection('directories').add({
    //   workspace: personalWorkSpaceDoc,
    //   parentRef: directoryDoc,
    //   name: `My Sub Directory ${number}`
    // });

    const fileDoc = await firestore.collection('files').add({
      workspaceRef: personalWorkSpaceDoc,
      parentRef: null,
      userID: 'DiNO4M1YsgPgm8hg3c5m',
      name: `My File ${number}`
    });

    // await fileDoc.directoryDoc('files').add({
    //   workspace: personalWorkSpaceDoc,
    //   parentRef: fileDoc,
    //   name: `My Sub Files ${number}`
    // });
  });
};


seedFunction().then(() => {
  console.log('done');
});

