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
    //TODO: Make name into an array to allow for weebs
    name: string,
    day: number,
    namesList: Array<String>,
    enabled: boolean,
    folderName: string,
    hints: Array<string>,
    firstFrameGuesses: number,
    secondFrameGuesses: number,
    thirdFrameGuesses: number,
    fourthFrameGuesses: number,
    fifthFrameGuesses: number,
    sixthFrameGuesses: number,
    failedGuesses: number,
    totalGuesses: number,
    successRate: number,
    firstFrameRate: number
}