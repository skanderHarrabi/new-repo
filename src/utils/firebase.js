import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC9evS33cJfZx3LLYWosLaoR4IEG4pap88",
    authDomain: "to-do-app-25acd.firebaseapp.com",
    projectId: "to-do-app-25acd",
    storageBucket: "to-do-app-25acd.appspot.com",
    messagingSenderId: "82665293315",
    appId: "1:82665293315:web:9de75041a2e5bdfbbeb036",
    measurementId: "G-6PXVX49CBV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;