import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD75tUbjX_V4NJ1B74XtmGt6pPQZ6uqcFI",
    authDomain: "ssdc-todo.firebaseapp.com",
    projectId: "ssdc-todo",
    storageBucket: "ssdc-todo.appspot.com",
    messagingSenderId: "833013040172",
    appId: "1:833013040172:web:45a3204cb0d115d6f93d89"
});


const db = firebaseApp.firestore();

export default db;