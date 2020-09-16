import {db} from './firebase';

export const COLLECTION = {
    GAME: db.collection("game"),
    DICTS_EN: db.collection("dicts_en"),
    DICTS_RU: db.collection("dicts_ru")
}

export const updateCurrentTeam = async (keyword, team) => {
    await COLLECTION.GAME.doc(keyword).set({currentTeam: team}, {merge: true});
}

export const updateGameStatus = async (keyword, newData) => {
    const timestamp = +new Date();
    await COLLECTION.GAME.doc(keyword).set({timestamp, ...newData}, {merge: true});
}

export const fetchGameData = async (keyword, func) => {
    const oneHour = 60 * 60 * 1000;
    await COLLECTION.GAME
        .doc(keyword)
        //.where("timestamp", ">", + new Date() - oneHour)
        .onSnapshot(querySnapshot => func(querySnapshot));
}

export const fetchKeywords = async () => {

    const snapshot = await COLLECTION.DICTS_RU.get();
    const index = Math.floor(Math.random() * snapshot.docs.length);
    console.log(index);
    return snapshot.docs.map(doc => doc.data()['words'])[index];
}
