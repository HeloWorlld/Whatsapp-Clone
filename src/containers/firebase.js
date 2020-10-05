import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDgyLCr648JEiOzby0f-IChwOLgJX1ZDig",
    authDomain: "whatsapp-clone-c8929.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-c8929.firebaseio.com",
    projectId: "whatsapp-clone-c8929",
    storageBucket: "whatsapp-clone-c8929.appspot.com",
    messagingSenderId: "89633339268",
    appId: "1:89633339268:web:f86e8ef1721d8811004fd1",
    measurementId: "G-T65JF2WSR0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
