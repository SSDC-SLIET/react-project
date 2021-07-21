import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
});

const db = firebaseApp.firestore();

export default db;