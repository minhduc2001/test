const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore/lite');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBC337IV_8pIAzM6R16uBWrD-SE9BZs-yI",
    authDomain: "stream-e2870.firebaseapp.com",
    projectId: "stream-e2870",
    storageBucket: "stream-e2870.appspot.com",
    messagingSenderId: "585851893244",
    appId: "1:585851893244:web:8ceaedeba5e17cb9812e79"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


module.exports = db;