import { app, auth, gameCollection, listCollection} from "./main";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
// import { getStorage, ref, uploadBytes } from "firebase/storage"
// import { getFirestore, collection, addDoc, doc } from "firebase/firestore"
// import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    if(user) {
        const uid = user.uid;
        console.log("User logged in: " + user);
    }else{
        console.log("Not logged in!")
        // window.location.href = "/website/html/main.html"
    }
});

//Storage
const storage = getStorage()
const folderRef = ref(storage, "AnimeFrameGuesser")


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


function hasImages(): Boolean{
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

function validText(): Boolean {
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

function validFolderName(): Boolean {
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
    let firstRef = ref(folderRef, "1")
    let secondRef = ref(folderRef, "2")
    let thirdRef = ref(folderRef, "3")
    let fourthRef = ref(folderRef, "4")
    let fifthRef = ref(folderRef, "5")
    let sixthRef = ref(folderRef, "6")

    let firstFile = firstFrameInput.files![0]
    let secondFile = secondFrameInput.files![0]
    let thirdFile = thirdFrameInput.files![0]
    let fourthFile = fourthFrameInput.files![0]
    let fifthFile = fifthFrameInput.files![0] 
    let sixthFile = sixthFrameInput.files![0]

    let firstPromise = uploadBytes(firstRef, firstFile).then((snapshot) => {
        console.log('Uploaded first image!');
    });
    let secondPromise = uploadBytes(secondRef, secondFile).then((snapshot) => {
        console.log('Uploaded second image!');
    });
    let thirdPromise = uploadBytes(thirdRef, thirdFile).then((snapshot) => {
        console.log('Uploaded third image!');
    });
    let fourthPromise = uploadBytes(fourthRef, fourthFile).then((snapshot) => {
        console.log('Uploaded fourth image!');
    });
    let fifthPromise = uploadBytes(fifthRef, fifthFile).then((snapshot) => {
        console.log('Uploaded fifth image!');
    });
    let sixthPromise = uploadBytes(sixthRef, sixthFile).then((snapshot) => {
        console.log('Uploaded sixth image!');
    });
    return Promise.all([firstPromise, secondPromise, thirdPromise, fourthPromise, fifthPromise, sixthPromise])
}