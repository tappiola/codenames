import {db} from './firebase';

const COLLECTION = {
    GAME: db.collection("game")
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
