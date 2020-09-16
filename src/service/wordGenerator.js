import Chance from "chance";
import {COLOUR, GAME_CONFIG, TEAM} from '../constants';
import {fetchKeywords} from '../firebaseActions';

export const generateGame = async gameKeyword => {
    const dictionary = await fetchKeywords();
    // const dictionary = ['ведьма', 'век', 'великан', 'венец', 'вера', 'вертолёт', 'верфь', 'вес', 'весна', 'ветер',
    //     'вечер', 'взгляд', 'вид', 'вилка', 'вирус', 'виски', 'вода', 'водолаз', 'вождь', 'воздух', 'война', 'волна',
    //     'воля', 'вор', 'ворот', 'ворота', 'врач', 'время', 'выпечка', 'высота', 'выступление', 'гавань', 'газ', 'газель',
    //     'галоп', 'гвоздь', 'гений', 'герб', 'Германия', 'герой', 'гигант', 'глаз', 'Голливуд', 'голова', 'голос',
    //     'голубь', 'гольф', 'гора', 'горло', 'горн', 'город', 'Горький', 'град', 'гранат', 'гранит', 'гребень', 'Греция',
    //     'гриф', 'группа', 'груша', 'губа'];

    const chance1 = new Chance(gameKeyword);
    const colorOptions = chance1.shuffle([TEAM.red, TEAM.blue]);
    const colors = chance1.shuffle([
        COLOUR.black,
        ...Array((GAME_CONFIG.fieldSize - GAME_CONFIG.whiteWordsCount) / 2).fill(colorOptions[0]),
        ...Array((GAME_CONFIG.fieldSize - GAME_CONFIG.whiteWordsCount) / 2 - 1).fill(colorOptions[1]),
        ...Array(GAME_CONFIG.whiteWordsCount).fill(COLOUR.white)
    ]);

    const words = chance1.shuffle(dictionary).slice(0, GAME_CONFIG.fieldSize);
    const gameData = words.map((word, i) => ({word, color: colors[i]}));
    return [gameData, colorOptions[0]];
}

export const generateRandomWord = () => {
    return Math.random().toString(36).substr(2, 8);
}
