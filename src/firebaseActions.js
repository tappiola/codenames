import {db} from './firebase';
import {selectRandomIndex} from "./service/wordGenerator";
import {LANGUAGES} from "./constants";

export const COLLECTION = {
    GAME: {
        [LANGUAGES.EN]: db.collection("game_en"),
        [LANGUAGES.RU]: db.collection("game_ru"),
    },
    DICT: {
        [LANGUAGES.EN]: db.collection("dicts_en"),
        [LANGUAGES.RU]: db.collection("dicts_ru")
    },
    KEYWORD: {
        [LANGUAGES.EN]: db.collection("keywords_en"),
        [LANGUAGES.RU]: db.collection("keywords_ru")
    },
}

export const updateCurrentTeam = async (keyword, language, team) => {
    await COLLECTION.GAME[language].doc(keyword).set({currentTeam: team}, {merge: true});
}

export const updateGameStatus = async (keyword, language, newData) => {
    const timestamp = +new Date();
    await COLLECTION.GAME[language].doc(keyword).set({timestamp, ...newData}, {merge: true});
}

export const fetchGameData = async (keyword, language, func) => {
    //const ONE_HOUR = 1 * 20 * 1000;
    const ONE_HOUR = 60 * 60 * 1000;

    const existingGameRef = await COLLECTION.GAME[language].doc(keyword);
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

    const snapshot = await COLLECTION.DICT[language].get();
    const index = selectRandomIndex(gameKeyword, snapshot.docs.length);
    return snapshot.docs.map(doc => doc.data()['words'])[index];
}

export const fetchKeywords = async language => {
    const snapshot = await COLLECTION.KEYWORD[language].doc('keywords').get();
    return snapshot.data()['words'];
}
