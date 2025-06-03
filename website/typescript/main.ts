// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { getFirestore, collection, addDoc, doc } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

interface GameData {
    animeName: string,
    enabled: boolean
    folderName: string,
    firstFrame: File,
    secondFrame: File,
    thirdFrame: File,
    fourthFrame: File,
    fifthFrame: File,
    sixthFrame: File,
    hint1: string,
    hint2: string,
    hint3: string,
    hint4: string,
    hint5: string,
}

interface firestoreData {
    day: number,
    name: string,
    
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firestore
const db = getFirestore(app)
const gameCollection = collection(db, "AnimeFrameGuesser")
const listCollection = collection(db, "AnimeFrameDays")

//Storage
const storage = getStorage()
const folderRef = ref(storage, "AnimeFrameGuesser")

//This is super messy, but this is meant for my personal use so I'm okay with it.
//HTML
//Divs to hide and reveal
const signIn = document.getElementById("signIn") as HTMLDivElement
const selection = document.getElementById("selection") as HTMLDivElement
const nameUploader = document.getElementById("nameUploader") as HTMLDivElement
const uploader = document.getElementById("uploader") as HTMLDivElement

//Sign in div
const username = document.getElementById("username") as HTMLInputElement
const password = document.getElementById("password") as HTMLInputElement
const signInButton = document.getElementById("signInButton") as HTMLButtonElement

//Selection div
const nameUploaderButton = document.getElementById("nameUploaderButton") as HTMLButtonElement
const gameUploaderButton = document.getElementById("gameUploaderButton") as HTMLButtonElement

//Name uploader div
const list = document.getElementById("list") as HTMLDivElement
const arrayDisplay = document.getElementById("arrayDisplay") as HTMLParagraphElement
const uploadListButton = document.getElementById("uploadList") as HTMLButtonElement

//Game uploader div
const animeName = document.getElementById("animeName") as HTMLInputElement
const folderName = document.getElementById("folderName") as HTMLInputElement

const firstFrameInput = document.getElementById("firstFrameImage") as HTMLInputElement
const firstImage = document.getElementById("firstImage") as HTMLImageElement

const secondFrameInput = document.getElementById("secondFrameImage") as HTMLInputElement
const secondImage = document.getElementById("secondImage") as HTMLImageElement

const thirdFrameInput = document.getElementById("thirdFrameImage") as HTMLInputElement
const thirdImage = document.getElementById("thirdImage") as HTMLImageElement

const fourthFrameInput = document.getElementById("fourthFrameImage") as HTMLInputElement
const fourthImage = document.getElementById("fourthImage") as HTMLImageElement

const fifthFrameInput = document.getElementById("fifthFrameImage") as HTMLInputElement
const fifthImage = document.getElementById("fifthImage") as HTMLImageElement

const sixthFrameInput = document.getElementById("sixthFrameImage") as HTMLInputElement
const sixthImage = document.getElementById("sixthImage") as HTMLImageElement

const hint1 = document.getElementById("firstHint") as HTMLInputElement
const hint2 = document.getElementById("secondHint") as HTMLInputElement
const hint3 = document.getElementById("thirdHint") as HTMLInputElement
const hint4 = document.getElementById("fourthHint") as HTMLInputElement
const hint5 = document.getElementById("fifthHint") as HTMLInputElement

const uploadButton = document.getElementById("upload") as HTMLButtonElement
const result = document.getElementById("results") as HTMLParagraphElement

//Display image event listeners
firstFrameInput.addEventListener("change", displayImage(firstImage))
secondFrameInput.addEventListener("change", displayImage(secondImage))
thirdFrameInput.addEventListener("change", displayImage(thirdImage))
fourthFrameInput.addEventListener("change", displayImage(fourthImage))
fifthFrameInput.addEventListener("change", displayImage(fifthImage))
sixthFrameInput.addEventListener("change", displayImage(sixthImage))

//Upload button event listener
uploadButton.addEventListener("click", uploadData)

//No other validation cause I trust myself for the most part.
async function uploadData() {
    if(!hasImages()){
        result.innerHTML = "All frames must have an image."
    }
    trimText()
    if(!validFolderName()){
        result.innerHTML = "Folder name must be alphanumeric with no white space"
    }
    if(!validText()){
            result.innerHTML = "All hints must be filled."
    }
    await uploadImages().then(() =>
        console.log("All images uploaded.")
    )
}


function hasImages(): boolean{
    if (firstFrameInput.files && firstFrameInput.files[0] &&
        secondFrameInput.files != null &&  secondFrameInput.files[0] &&
        thirdFrameInput.files != null && thirdFrameInput.files[0] &&
        fourthFrameInput.files != null && fourthFrameInput.files[0] &&
        fifthFrameInput.files != null && fifthFrameInput.files[0] &&
        sixthFrameInput.files != null && sixthFrameInput.files[0]
    ){
        return true
    }else{
        return false
    }
}

function trimText(){
    animeName.value = animeName.value.trim()
    folderName.value = folderName.value.trim()
    hint1.value = hint1.value.trim()
    hint2.value = hint2.value.trim()
    hint3.value = hint3.value.trim()
    hint4.value = hint4.value.trim()
    hint5.value = hint5.value.trim()
}

function validText(): boolean {
    if(
        animeName.value &&
        hint1.value && 
        hint2.value && 
        hint3.value && 
        hint4.value && 
        hint5.value 
    ){
        return true
    }else{
        return false
    }
}

function validFolderName(): boolean {
    //alphanumeric only
    if(folderName.value && /^[a-zA-Z0-9]*$/.test(folderName.value)){
        return true
    }else{
        return false
    }
}
function displayImage(image: HTMLImageElement) {
    return (event: Event) => {
        console.log("Testing!");
        const input = event.target as HTMLInputElement
        if (input.files && input.files[0]) {
            image.src = URL.createObjectURL(input.files[0])
        }
    }
} 

async function uploadImages(): Promise<any> {
    const firstRef = ref(folderRef, "1")
    const secondRef = ref(folderRef, "2")
    const thirdRef = ref(folderRef, "3")
    const fourthRef = ref(folderRef, "4")
    const fifthRef = ref(folderRef, "5")
    const sixthRef = ref(folderRef, "6")

    const firstFile = firstFrameInput.files![0]
    const secondFile = secondFrameInput.files![0]
    const thirdFile = thirdFrameInput.files![0]
    const fourthFile = fourthFrameInput.files![0]
    const fifthFile = fifthFrameInput.files![0] 
    const sixthFile = sixthFrameInput.files![0]

    const firstPromise = uploadBytes(firstRef, firstFile).then((snapshot) => {
        console.log('Uploaded first image!');
    });
    const secondPromise = uploadBytes(secondRef, secondFile).then((snapshot) => {
        console.log('Uploaded second image!');
    });
    const thirdPromise = uploadBytes(thirdRef, thirdFile).then((snapshot) => {
        console.log('Uploaded third image!');
    });
    const fourthPromise = uploadBytes(fourthRef, fourthFile).then((snapshot) => {
        console.log('Uploaded fourth image!');
    });
    const fifthPromise = uploadBytes(fifthRef, fifthFile).then((snapshot) => {
        console.log('Uploaded fifth image!');
    });
    const sixthPromise = uploadBytes(sixthRef, sixthFile).then((snapshot) => {
        console.log('Uploaded sixth image!');
    });
    return Promise.all([firstPromise, secondPromise, thirdPromise, fourthPromise, fifthPromise, sixthPromise])
}

async function uploadDocument(): Promise<any>{

}
function getGameData(): GameData {
    const gameData: GameData = {
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
}

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