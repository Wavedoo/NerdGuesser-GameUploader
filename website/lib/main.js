"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firebaseConfig_1 = require("./firebaseConfig");
const storage_1 = require("firebase/storage");
const firestore_1 = require("firebase/firestore");
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig_1.firebaseConfig);
//Firestore
const db = (0, firestore_1.getFirestore)(app);
const gameCollection = (0, firestore_1.collection)(db, "AnimeFrameGuesser");
const listCollection = (0, firestore_1.collection)(db, "AnimeFrameDays");
//Storage
const storage = (0, storage_1.getStorage)();
const folderRef = (0, storage_1.ref)(storage, "AnimeFrameGuesser");
//This is super messy, but this is meant for my personal use so I'm okay with it.
//HTML
//Divs to hide and reveal
const signIn = document.getElementById("signIn");
const selection = document.getElementById("selection");
const nameUploader = document.getElementById("nameUploader");
const uploader = document.getElementById("uploader");
//Sign in div
const username = document.getElementById("username");
const password = document.getElementById("password");
const signInButton = document.getElementById("signInButton");
//Selection div
const nameUploaderButton = document.getElementById("nameUploaderButton");
const gameUploaderButton = document.getElementById("gameUploaderButton");
//Name uploader div
const list = document.getElementById("list");
const arrayDisplay = document.getElementById("arrayDisplay");
const uploadListButton = document.getElementById("uploadList");
//Game uploader div
const animeName = document.getElementById("animeName");
const folderName = document.getElementById("folderName");
const firstFrameInput = document.getElementById("firstFrameImage");
const firstImage = document.getElementById("firstImage");
const secondFrameInput = document.getElementById("secondFrameImage");
const secondImage = document.getElementById("secondImage");
const thirdFrameInput = document.getElementById("thirdFrameImage");
const thirdImage = document.getElementById("thirdImage");
const fourthFrameInput = document.getElementById("fourthFrameImage");
const fourthImage = document.getElementById("fourthImage");
const fifthFrameInput = document.getElementById("fifthFrameImage");
const fifthImage = document.getElementById("fifthImage");
const sixthFrameInput = document.getElementById("sixthFrameImage");
const sixthImage = document.getElementById("sixthImage");
const hint1 = document.getElementById("firstHint");
const hint2 = document.getElementById("secondHint");
const hint3 = document.getElementById("thirdHint");
const hint4 = document.getElementById("fourthHint");
const hint5 = document.getElementById("fifthHint");
const uploadButton = document.getElementById("upload");
const result = document.getElementById("results");
//Display image event listeners
firstFrameInput.addEventListener("change", displayImage(firstImage));
secondFrameInput.addEventListener("change", displayImage(secondImage));
thirdFrameInput.addEventListener("change", displayImage(thirdImage));
fourthFrameInput.addEventListener("change", displayImage(fourthImage));
fifthFrameInput.addEventListener("change", displayImage(fifthImage));
sixthFrameInput.addEventListener("change", displayImage(sixthImage));
//Upload button event listener
uploadButton.addEventListener("click", uploadData);
//No other validation cause I trust myself for the most part.
function uploadData() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!hasImages()) {
            result.innerHTML = "All frames must have an image.";
        }
        trimText();
        if (!validFolderName()) {
            result.innerHTML = "Folder name must be alphanumeric with no white space";
        }
        if (!validText()) {
            result.innerHTML = "All hints must be filled.";
        }
        yield uploadImages().then(() => console.log("All images uploaded."));
    });
}
function hasImages() {
    if (firstFrameInput.files && firstFrameInput.files[0] &&
        secondFrameInput.files != null && secondFrameInput.files[0] &&
        thirdFrameInput.files != null && thirdFrameInput.files[0] &&
        fourthFrameInput.files != null && fourthFrameInput.files[0] &&
        fifthFrameInput.files != null && fifthFrameInput.files[0] &&
        sixthFrameInput.files != null && sixthFrameInput.files[0]) {
        return true;
    }
    else {
        return false;
    }
}
function trimText() {
    animeName.value = animeName.value.trim();
    folderName.value = folderName.value.trim();
    hint1.value = hint1.value.trim();
    hint2.value = hint2.value.trim();
    hint3.value = hint3.value.trim();
    hint4.value = hint4.value.trim();
    hint5.value = hint5.value.trim();
}
function validText() {
    if (animeName.value &&
        hint1.value &&
        hint2.value &&
        hint3.value &&
        hint4.value &&
        hint5.value) {
        return true;
    }
    else {
        return false;
    }
}
function validFolderName() {
    //alphanumeric only
    if (folderName.value && /^[a-zA-Z0-9]*$/.test(folderName.value)) {
        return true;
    }
    else {
        return false;
    }
}
function displayImage(image) {
    return (event) => {
        console.log("Testing!");
        const input = event.target;
        if (input.files && input.files[0]) {
            image.src = URL.createObjectURL(input.files[0]);
        }
    };
}
function uploadImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const firstRef = (0, storage_1.ref)(folderRef, "1");
        const secondRef = (0, storage_1.ref)(folderRef, "2");
        const thirdRef = (0, storage_1.ref)(folderRef, "3");
        const fourthRef = (0, storage_1.ref)(folderRef, "4");
        const fifthRef = (0, storage_1.ref)(folderRef, "5");
        const sixthRef = (0, storage_1.ref)(folderRef, "6");
        const firstFile = firstFrameInput.files[0];
        const secondFile = secondFrameInput.files[0];
        const thirdFile = thirdFrameInput.files[0];
        const fourthFile = fourthFrameInput.files[0];
        const fifthFile = fifthFrameInput.files[0];
        const sixthFile = sixthFrameInput.files[0];
        const firstPromise = (0, storage_1.uploadBytes)(firstRef, firstFile).then((snapshot) => {
            console.log('Uploaded first image!');
        });
        const secondPromise = (0, storage_1.uploadBytes)(secondRef, secondFile).then((snapshot) => {
            console.log('Uploaded second image!');
        });
        const thirdPromise = (0, storage_1.uploadBytes)(thirdRef, thirdFile).then((snapshot) => {
            console.log('Uploaded third image!');
        });
        const fourthPromise = (0, storage_1.uploadBytes)(fourthRef, fourthFile).then((snapshot) => {
            console.log('Uploaded fourth image!');
        });
        const fifthPromise = (0, storage_1.uploadBytes)(fifthRef, fifthFile).then((snapshot) => {
            console.log('Uploaded fifth image!');
        });
        const sixthPromise = (0, storage_1.uploadBytes)(sixthRef, sixthFile).then((snapshot) => {
            console.log('Uploaded sixth image!');
        });
        return Promise.all([firstPromise, secondPromise, thirdPromise, fourthPromise, fifthPromise, sixthPromise]);
    });
}
function uploadDocument() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function getGameData() {
    const gameData = {
        animeName: animeName.value,
        enabled: true,
        folderName: folderName.value,
        firstFrame: firstFrameInput.files[0],
        secondFrame: secondFrameInput.files[0],
        thirdFrame: thirdFrameInput.files[0],
        fourthFrame: firstFrameInput.files[0],
        fifthFrame: firstFrameInput.files[0],
        sixthFrame: firstFrameInput.files[0],
        hint1: hint1.value,
        hint2: hint2.value,
        hint3: hint3.value,
        hint4: hint4.value,
        hint5: hint5.value
    };
    return gameData;
}
function getNextDay() {
    return 4;
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
