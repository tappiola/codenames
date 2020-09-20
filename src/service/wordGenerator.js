import Chance from "chance";
import {COLOUR, GAME_CONFIG, TEAM} from '../constants';
import {fetchDictionaries} from '../firebaseActions';

export const generateGame = async (gameKeyword, language) => {
    const dictionary = await fetchDictionaries(gameKeyword, language);

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

export const selectRandomIndex = (gameKeyword, maxIndex) => {
    const chance = new Chance(gameKeyword);
    return chance.integer({min: 0, max: maxIndex});
}

export const generateKeyword = words => {
    const index = Math.floor(Math.random() * words.length);
    console.log(index)
    return words[index];
}
