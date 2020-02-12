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

  const personalOrganizationDoc = await firestore.collection('organizations').add({
    name: 'Personal',
    creator: userRef,
    admins: {
      [ericUserID]: firestore.collection('users').doc(ericUserID)
    },
    members: {
      [ericUserID]: firestore.collection('users').doc(ericUserID)
    }
  });

  const ojOrganizationDoc = await firestore.collection('organizations').add({
    name: 'Orange Juice',
    creator: userRef,
    admins: {
      [ericUserID]: firestore.collection('users').doc(ericUserID)
    },
    members: {
      [ericUserID]: firestore.collection('users').doc(ericUserID)
    }
  });

  [1, 2, 3, 4, 5].forEach(async (number) => {
    const fileDoc = await firestore.collection('files').add({
      orgRef: personalOrganizationDoc,
      parentRef: null,
      userID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
      name: `My File ${number}`,
      events: [],
      approvals: {},
      tags: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    [1, 2, 3, 4, 5].forEach(async (number) => {
      const commentRef = await fileDoc.collection('comments').add({
        body: 'some toxic feedback about this scumbags blueprint',
        documentRef: fileDoc,
        authorID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
        avatarURL: 'https://avatars1.githubusercontent.com/u/8476121?v=4',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        resolved: false,
        position: null
      });

      [1, 2].forEach(async (number) => {
        await commentRef.collection('replies').add({
          body: 'This is the best way I think.',
          documentRef: fileDoc,
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
