// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { getFirestore, collection} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
console.log("The issue starts here!")
export const app = initializeApp(firebaseConfig);

//Authentication
export const auth = getAuth(app)

//Firestore
export const db = getFirestore(app)
export const gameCollection = collection(db, "AnimeFrameGuesser")
export const listCollection = collection(db, "AnimeFrameDays")