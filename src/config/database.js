import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCffiHLkMRE-1hyFk6_jtTc3YQOX0nXgp4",
    authDomain: "nabung-7be33.firebaseapp.com",
    projectId: "nabung-7be33",
    storageBucket: "nabung-7be33.appspot.com",
    messagingSenderId: "848083070466",
    appId: "1:848083070466:web:7c324497600d946a01011b"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// Use Firestore
const db = firebase.firestore(app);

export const Users = db.collection('users');
export const Transactions = db.collection('transactions');

export {firebase};