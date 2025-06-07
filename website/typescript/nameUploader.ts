import { app, db, auth, gameCollection, listCollection, uploadNameArray, namesRef} from "./firebase";
// import { getStorage, ref, uploadBytes } from "firebase/storage"
// import { getFirestore, collection, addDoc, doc } from "firebase/firestore"
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Initialize Firebase
console.log("nameUploader.ts is working!")

//Firestore
const globalRef = doc(db, "other", "global")
// var globalSnap = await getDoc(globalRef)

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

var arr: string[] = []
var dbArr: string[] = []
var dbSet = new Set<String>();


//Name uploader div
// const list = document.getElementById("list") as HTMLDivElement
const names = document.getElementById("names") as HTMLTextAreaElement
const display = document.getElementById("display") as HTMLParagraphElement
const upload = document.getElementById("upload") as HTMLButtonElement

names.addEventListener("change", updateArray)
upload.addEventListener("click", uploadNames)

function updateArray(){
    arr = names.value.split("\n")
    arr.forEach((value, index) =>{
        arr[index] = value.trim()
    });
    arr = arr.filter(item => item != "")
    console.log(arr)
    displayArray()
}

function displayArray(){
    display.innerHTML = arr.join("<br>")
}

//2 writes and 1 read to bring my network egress down on the client side.
async function uploadNames(){
    console.log("Upload started.")
    await uploadNameArray(arr)

    dbArr = await getFirestoreArray()
    await updateDoc(globalRef, {
        animeListCount: dbArr.length
    }).then(() => {
        console.log("AnimeListCount updated successfully.");
    }).catch(() => {
        console.log("Failed to update animeListCount");
    });
}


/* 
Time complexity because I am concerned here.
n = names in firestore array
m = names meant to be uploaded
O(n+m)
*/
async function oldUploadArray(){
    console.log("Upload clicked")
    dbArr = await getFirestoreArray()// O(n) probably
    console.log("getFromFirestoreArray: ", dbArr);
    dbArr = dbArr.map(name => {
        return name.toUpperCase()
    });
    console.log("dbArr.map()", dbArr)
    dbSet = new Set(dbArr); // O(n)
    console.log("db set  = ", dbSet)
    checkForDuplicates()
    console.log("Final array to union: ", arr)
    //Upload from here.
    await updateDoc(namesRef, {
        names: arrayUnion(...arr)
    }).then(() => {
        console.log("Doc updated! This is the then log!")
    }).finally(() => {
        console.log("Finally.")
    });
    console.log("Doc updated?")
}
//O (whatever it is let's say n)
async function getFirestoreArray(): Promise<string[]>{
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
//O(m)
function checkForDuplicates(){
    // arr = 
    console.log("Check for duplicates: ", arr)
    console.log("Set to check: ", dbSet)
    arr = arr.filter((name) => {
        console.log("name.toUpperCase()", name.toUpperCase())
        console.log("In set: ", dbSet.has(name.toUpperCase()))
        return !dbSet.has(name.toUpperCase())
    });
    console.log("Duplicates removed: ", arr)
}