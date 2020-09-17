import Chance from "chance";
import {COLOUR, GAME_CONFIG, TEAM} from '../constants';
import {fetchDictionaries} from '../firebaseActions';

export const generateGame = async gameKeyword => {
    const dictionary = await fetchDictionaries(gameKeyword);

    const chance = new Chance(gameKeyword);
    const colorOptions = chance.shuffle([TEAM.red, TEAM.blue]);
    const colors = chance.shuffle([
        COLOUR.black,
        ...Array((GAME_CONFIG.fieldSize - GAME_CONFIG.whiteWordsCount) / 2).fill(colorOptions[0]),
        ...Array((GAME_CONFIG.fieldSize - GAME_CONFIG.whiteWordsCount) / 2 - 1).fill(colorOptions[1]),
        ...Array(GAME_CONFIG.whiteWordsCount).fill(COLOUR.white)
    ]);

    const words = chance.shuffle(dictionary).slice(0, GAME_CONFIG.fieldSize);
    const gameData = words.map((word, i) => ({word, color: colors[i]}));
    return [gameData, colorOptions[0]];
}

export const generateRandomWord = () => {
    return Math.random().toString(36).substr(2, 8);
}

export const selectRandomIndex = (gameKeyword, maxIndex) => {
    const chance = new Chance(gameKeyword);
    return chance.integer({min: 0, max: maxIndex});
}
