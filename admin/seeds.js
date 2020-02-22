const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mermaid-v1.firebaseio.com'
});

const firestore = admin.firestore();

const seedFunction = async () => {
  const ericUserID = 'P8VSjFSeduaoP3ELW3V6UuA9erR2';

  const userRef = firestore.collection('users').doc(ericUserID);

  userRef.set({
    username: 'ericstotle'
  });

  // for Personal
  const personalOrganizationDoc = await firestore.collection('organizations').add({
    name: 'Personal',
    creator: userRef,
    admins: [firestore.collection('users').doc(ericUserID)],
    members: [firestore.collection('users').doc(ericUserID)],
    tags: []
  });

  [1, 2, 3, 4, 5].forEach(async (number) => {
    const blueprintDoc = await firestore.collection('blueprints').add({
      organizationRef: personalOrganizationDoc,
      userID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
      title: `Personal File ${number}`,
      events: [],
      approvals: {},
      tags: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    [1, 2, 3, 4, 5].forEach(async () => {
      const commentRef = await blueprintDoc.collection('comments').add({
        body: 'some toxic feedback about this scumbags blueprint',
        blueprintRef: blueprintDoc,
        authorID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
        avatarURL: 'https://avatars1.githubusercontent.com/u/8476121?v=4',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        resolved: false,
        position: null
      });

      [1, 2].forEach(async () => {
        await commentRef.collection('replies').add({
          body: 'This is the best way I think.',
          blueprintRef: blueprintDoc,
          commentRef: commentRef,
          authorID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
          avatarURL: 'https://avatars1.githubusercontent.com/u/8476121?v=4',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });

    });
  });

  // FOR ORG
  const ojOrganizationDoc = await firestore.collection('organizations').add({
    name: 'Orange Juice',
    creator: userRef,
    admins: [firestore.collection('users').doc(ericUserID)],
    members: [firestore.collection('users').doc(ericUserID)],
    tags: []
  });


  [1, 2, 3, 4, 5].forEach(async (number) => {
    const blueprintDoc = await firestore.collection('blueprints').add({
      organizationRef: ojOrganizationDoc,
      userID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
      title: `OJ File ${number}`,
      events: [],
      approvals: {},
      tags: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    [1, 2, 3, 4, 5].forEach(async () => {
      const commentRef = await blueprintDoc.collection('comments').add({
        body: 'some toxic feedback about this scumbags blueprint',
        blueprintRef: blueprintDoc,
        authorID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
        avatarURL: 'https://avatars1.githubusercontent.com/u/8476121?v=4',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        resolved: false,
        position: null
      });

      [1, 2].forEach(async () => {
        await commentRef.collection('replies').add({
          body: 'This is the best way I think.',
          blueprintRef: blueprintDoc,
          commentRef: commentRef,
          authorID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
          avatarURL: 'https://avatars1.githubusercontent.com/u/8476121?v=4',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });

    });
  });

};


seedFunction().then(() => {
  console.log('done');
});
