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
onAuthStateChanged(auth, (user) => {
    if(user) {
        const uid = user.uid;
        console.log("User logged in: " + user);
    }else{
        console.log("Not logged in!")
        // window.location.href = "/website/html/main.html"
    }
});


//Firestore
export const db = getFirestore(app)
export const gameCollection = collection(db, "AnimeFrameGuesser")
export const listCollection = collection(db, "AnimeFrameDays")

//This is super messy, but this is meant for my personal use so I'm okay with it.
//HTML
//Divs to hide and reveal
const signIn = document.getElementById("signIn") as HTMLDivElement
const selection = document.getElementById("selection") as HTMLDivElement

//Sign in div
const username = document.getElementById("username") as HTMLInputElement
const password = document.getElementById("password") as HTMLInputElement
const signInButton = document.getElementById("signInButton") as HTMLButtonElement
signInButton.addEventListener("click", attemptSignIn)

//Selection div
const nameUploaderButton = document.getElementById("nameUploaderButton") as HTMLButtonElement
const gameUploaderButton = document.getElementById("gameUploaderButton") as HTMLButtonElement

nameUploaderButton.addEventListener("click", navigateToNameUploader)
gameUploaderButton.addEventListener("click", navigateToGameUploader)

function attemptSignIn(){
    username.value = username.value.trim()
    signInWithEmailAndPassword(auth, username.value, password.value).then((credential) => {
        const user = credential.user
        onSuccessfulLogin()
    })
    .catch((error) => {
        console.log("Error code: " + error.code +"\nMessage: " + error.message);
    })
}

function onSuccessfulLogin() {
    signIn.hidden = true
    selection.hidden = false
}

function navigateToGameUploader(){
    window.location.href = "/gameuploader.html"
}

function navigateToNameUploader(){
    window.location.href = "/nameuploader.html"
}

async function uploadDocument(): Promise<any>{

}
/* function getGameData(): GameData {
    let gameData: GameData = {
        animeName: animeName.value,
        enabled: true,
        folderName: folderName.value,
        firstFrame: firstFrameInput.files![0],
        secondFrame: secondFrameInput.files![0],
        thirdFrame: thirdFrameInput.files![0],
        fourthFrame: firstFrameInput.files![0],
        fifthFrame: firstFrameInput.files![0],
        sixthFrame: firstFrameInput.files![0],
        hint1: hint1.value,
        hint2: hint2.value,
        hint3: hint3.value,
        hint4: hint4.value,
        hint5: hint5.value
    }
    return gameData
} */

function getNextDay(): number {
    return 4
}
/*function displayImage(event: Event, displayId: String){
    const input = event.target as HTMLInputElement
    const preview = document.querySelector("img");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    firstImage.src = URL.createObjectURL(input.files[0])

    /* 
    reader.onload = function (e) {
        // firstImage?.setAttribute("src", e.target?.result)
        firstImage.setAttribute("src", e.target!.result) 
    };reader.readAsDataURL(input.files[0]);
  }
}*/