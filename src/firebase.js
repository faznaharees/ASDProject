import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyAdr8ujMuNVqOTWBDhDnTad15jSSklJ_7s",
    authDomain: "bookexchange-60635.firebaseapp.com",
    databaseURL: "https://bookexchange-60635.firebaseio.com",
    projectId: "bookexchange-60635",
    storageBucket: "bookexchange-60635.appspot.com",
    messagingSenderId: "532023126265",
    appId: "1:532023126265:web:feab9516f11d5dbdaf9a28",
    measurementId: "G-T3Y6XS6YJJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
  export const auth = firebase.auth();
  export const provider = new firebase.auth.GoogleAuthProvider();
  