import firebase from 'firebase';
require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyARETLv54b5BF0Bsd84j52GM4czVDEbvPc",
    authDomain: "bartersystemtradingapp.firebaseapp.com",
    databaseURL: "https://bartersystemtradingapp.firebaseio.com",
    projectId: "bartersystemtradingapp",
    storageBucket: "bartersystemtradingapp.appspot.com",
    messagingSenderId: "650780051890",
    appId: "1:650780051890:web:6d489243cba5b182cdfcab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();