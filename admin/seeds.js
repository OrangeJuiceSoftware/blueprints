const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');
const sampleMarkdown = `# This is a header And
this is a paragraph

\`\`\`mermaid
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]
\`\`\`

\`\`\`mermaid
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }			
\`\`\`

\`\`\`mermaid
sequenceDiagram
  Alice->>+John: Hello John, how are you?
  Alice->>+John: John, can you hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  John-->>-Alice: I feel great!
\`\`\`

\`\`\`mermaid
stateDiagram
  [*] --> Still
  Still --> [*]

  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]
\`\`\`

\`\`\`mermaid
pie 
  title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15           
\`\`\`

\`\`\`mermaid
gantt
  dateFormat  YYYY-MM-DD
  title Adding GANTT diagram functionality to mermaid

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2              :         des4, after des3, 5d
\`\`\`

\`\`\`
const kill me 
\`\`\`
`;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mermaid-v1.firebaseio.com'
});

const firestore = admin.firestore();

const seedFunction = async () => {
  const ericUserID = 'tPkrVIi04NdKyoSrWEV95tCR9MK2';

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
    labels: ['Blueprints', 'Diagrams', 'Random', 'Demo']
  });

  [1, 2, 3, 4, 5].forEach(async (number) => {
    const blueprintDoc = await firestore.collection('blueprints').add({
      organizationRef: personalOrganizationDoc,
      userID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
      title: `Personal File ${number}`,
      content: sampleMarkdown,
      approvals: {},
      labels: ['Blueprints', 'Diagrams', 'Random', 'Demo'],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    [1, 2].forEach(async () => {
      const activityDoc = await blueprintDoc.collection('activities').add({
        type: 'APPROVAL',
        userRef: userRef,
        blueprintRef:blueprintDoc,
        username: 'Eric Leong',
        avatarURL: 'https://avatars1.githubusercontent.com/u/8476121?v=4',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

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
    labels: ['Juice']
  });


  [1, 2, 3, 4, 5].forEach(async (number) => {
    const blueprintDoc = await firestore.collection('blueprints').add({
      organizationRef: ojOrganizationDoc,
      userID: 'P8VSjFSeduaoP3ELW3V6UuA9erR2',
      title: `OJ File ${number}`,
      content: sampleMarkdown,
      approvals: {},
      labels: ['Juice'],
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
