import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDH-jStbNtN3TxTRUjDh3bD7RovjYSBde8",
  authDomain: "realestate-mobileapp.firebaseapp.com",
  databaseURL: "https://realestate-mobileapp.firebaseio.com",
  projectId: "realestate-mobileapp",
  storageBucket: "realestate-mobileapp.appspot.com",
  messagingSenderId: "680540690558"
};

const firebase = Firebase.initializeApp(firebaseConfig);

export default firebase;
