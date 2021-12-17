import {db} from './firebase';
import {selectRandomIndex} from "./service/wordGenerator";
import {LANGUAGES} from "./constants";
import { doc, getDoc, setDoc, getDocs , onSnapshot, collection} from "firebase/firestore";

export const COLLECTION = {
    GAME: {
        [LANGUAGES.EN]: collection(db, "game_en"),
        [LANGUAGES.RU]: collection(db, "game_ru"),
    },
    DICT: {
        [LANGUAGES.EN]: collection(db, "dicts_en"),
        [LANGUAGES.RU]: collection(db, "dicts_ru")
    },
    KEYWORD: {
        [LANGUAGES.EN]: collection(db, "keywords_en"),
        [LANGUAGES.RU]: collection(db, "keywords_ru")
    },
}

export const updateCurrentTeam = async (keyword, language, team) => {
    const gameRef = doc(db, `game_${language}`, keyword);
    await setDoc(gameRef,{currentTeam: team}, {merge: true});
}

export const updateGameStatus = async (keyword, language, newData) => {
    const timestamp = +new Date();
    const gameRef = doc(db, `game_${language}`, keyword );
    await setDoc(gameRef, {timestamp, ...newData}, { merge: true });
}

export const fetchGameData = async (keyword, language, func) => {
    //const ONE_HOUR = 1 * 20 * 1000;
    const ONE_HOUR = 60 * 60 * 1000;

    const existingGameRef = doc(db, `game_${language}`, keyword );
    const snapshot = await getDoc(existingGameRef);

    if (snapshot.exists) {
        const gameDuration = new Date().getTime() - snapshot.get('timestamp');

        if (gameDuration > ONE_HOUR) {
            await snapshot.ref.delete()
        }
    }

    onSnapshot(existingGameRef, querySnapshot => func(querySnapshot));
}

export const fetchDictionaries = async (gameKeyword, language) => {
    const dictsCollection = collection(db, `dicts_${language}`);
    const snapshot = await getDocs(dictsCollection);
    const index = selectRandomIndex(gameKeyword, snapshot.docs.length - 1);
    return snapshot.docs.map(doc => doc.data()['words'])[index];
}

export const fetchKeywords = async language => {
    const keywordsRef = doc(db, `keywords_${language}`, 'keywords' );
    const snapshot = await getDoc(keywordsRef);

    return snapshot.data()['words'];
}
