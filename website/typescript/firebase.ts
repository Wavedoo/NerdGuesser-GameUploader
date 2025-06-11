// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { getFirestore, collection, arrayUnion, updateDoc, doc, getDoc} from "firebase/firestore"


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
export const globalRef = doc(db, "other", "global")
export const namesRef = doc(db, "AnimeInformation", "AnimeNames")

export async function uploadNameArray(arr: Array<string>){
    await updateDoc(namesRef, {
        names: arrayUnion(...arr)
    }).then(() => {
        console.log("Anime names list updated successfully.");
    }).catch(() => {
        console.log("Failed to update anime names lists");
    });

    const dbArr = await getFirestoreArray()
    await updateDoc(globalRef, {
        animeListCount: dbArr.length
    }).then(() => {
        console.log("AnimeListCount updated successfully.");
    }).catch(() => {
        console.log("Failed to update animeListCount");
    });
}

export async function getFirestoreArray(): Promise<string[]>{
    const namesSnap = await getDoc(namesRef)
    if(namesSnap.exists()){
        const namesArr = namesSnap.data()
        console.log("Document found. Array: ", namesArr)
        return namesArr["names"] as string[]
    }else{
        console.log("Document not found. Returning not found.")
        return []
    }
}