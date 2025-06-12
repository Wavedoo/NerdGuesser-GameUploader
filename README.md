# Nerd Guesser Game Uploader
This is meant to serve as a quick little local website for uploading data to the [NerdGuesser](https://github.com/Wavedoo/NerdGuesser) project. 

## Features
- Uploads a list of names to Firestore for the app to retrieve
- Uploads games to be added to the daily list.

## Current Issues 
I don't really do websites so I'm okay with its poor quality.
- I am unable to properly transfer from page to page
- Missing confirmations upon uploading something to firebase
  
## Usage
1. Create a file in the `typescript` folder called `firebaseConfig.ts` and fill it with the config details from your Firebase project
```
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_HERE"
};
```
2. Create a user that will be able to  in the project.
3. Allow the account to read and write via security rules. Add the following to the firestore rules and storage rules:
```allow read, write: if request.auth.uid == "YOUR_ACCOUNT_ID_HERE";```
4. Start up a local server for the project
5. Open it and log into the project
6. Go to one of the uploaders to upload.
### Name uploader
Enter a list of all the anime names you want to add to the Firebase project. Seperate them by new lines.

### Game Uploader
Enter all of the anime data.
