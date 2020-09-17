import {db} from './firebase';
import {selectRandomIndex} from "./service/wordGenerator";
import {LANGUAGES} from "./constants";

export const COLLECTION = {
    GAME: db.collection("game"),
    [LANGUAGES.EN]: db.collection("dicts_en"),
    [LANGUAGES.RU]: db.collection("dicts_ru")
}

export const updateCurrentTeam = async (keyword, team) => {
    await COLLECTION.GAME.doc(keyword).set({currentTeam: team}, {merge: true});
}

export const updateGameStatus = async (keyword, newData) => {
    const timestamp = +new Date();
    await COLLECTION.GAME.doc(keyword).set({timestamp, ...newData}, {merge: true});
}

export const fetchGameData = async (keyword, func) => {
    //const ONE_HOUR = 1 * 20 * 1000;
    const ONE_HOUR = 60 * 60 * 1000;

    const existingGameRef = await COLLECTION.GAME.doc(keyword);
    const snapshot = await existingGameRef.get();

    if (snapshot.exists) {

        const gameDuration = new Date().getTime() - snapshot.get('timestamp');
        if (gameDuration > ONE_HOUR) {
            await snapshot.ref.delete()
        }
    }

    existingGameRef.onSnapshot(querySnapshot => func(querySnapshot));
}

export const fetchDictionaries = async (gameKeyword, language) => {

    const snapshot = await COLLECTION[language].get();
    const index = selectRandomIndex(gameKeyword, snapshot.docs.length);
    return snapshot.docs.map(doc => doc.data()['words'])[index];
}
