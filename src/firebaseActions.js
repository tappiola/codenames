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

    let dict = [];
    await COLLECTION.DICTS_RU.doc('5').get()
        .then(function (querySnapshot) {
        console.log(querySnapshot.data()['words']);
        dict = querySnapshot.data()['words'];
    });
    return dict;
}
