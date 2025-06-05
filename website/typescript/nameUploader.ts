import { app, auth, gameCollection, listCollection} from "./main";
// import { getStorage, ref, uploadBytes } from "firebase/storage"
// import { getFirestore, collection, addDoc, doc } from "firebase/firestore"
import { collection, addDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Initialize Firebase
console.log("The issue starts here!")

//Authentication
onAuthStateChanged(auth, (user) => {
    if(user) {
        const uid = user.uid;
        console.log("User logged in: " + user);
    }else{
        console.log("Not logged in!")
        // window.location.href = "/website/html/main.html"
    }
});


//Name uploader div
const list = document.getElementById("list") as HTMLDivElement
const arrayDisplay = document.getElementById("arrayDisplay") as HTMLParagraphElement
const uploadListButton = document.getElementById("uploadList") as HTMLButtonElement