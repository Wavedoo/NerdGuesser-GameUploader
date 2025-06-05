//Not meant to be uploaded to firestore, meant for transfering data.
export interface GameData {
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

export interface firestoreData {
    day: number,
    //TODO: Make name into an array to allow for weebs
    name: string,
    firstFrameGuesses: number,
    
}