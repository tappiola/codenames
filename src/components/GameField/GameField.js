import React, {useCallback, useEffect, useState} from 'react';
import Chance from 'chance';
import {db} from "../../firebase";
import clsx from 'clsx';
import './GameField.css';
import {ROLE} from '../../App';


const TEAM = {
    red: 'red',
    blue: 'blue'
}

const COLOUR = {
    white: 'white',
    black: 'black'
}

const GameField = ({gameKeyword, playerRole, onNewGameStart}) => {

    const fieldSize = 25;
    const whiteWordsCount = 7;


    const MESSAGES = {
        YOUR_TURN: {
            [TEAM.red]: "Ход команды красных",
            [TEAM.blue]: "Ход команды синих"
        },
        WINNER: {
            [TEAM.red]: "Выиграла команда красных",
            [TEAM.blue]: "Выиграла команда синих"
        }
    }

    const [gameData, setGameData] = useState([]);
    const [currentTeam, setCurrentTeam] = useState();
    const [isBlackWordClicked, setIsBlackWordClicked] = useState(false);
    const [winner, setWinner] = useState(null);
    const [clickedData, setClickedData] = useState([]);
    const [clicksCurrentRound, setClicksCurrentRound] = useState(0);

    const invertColor = useCallback(colour => colour === TEAM.red ? TEAM.blue : TEAM.red, []);
    const getWordsCount = useCallback(colour => gameData.filter(i => i.color === colour && i.clicked === false).length, [gameData]);


    const changeTeam = useCallback(async () => {
        setClicksCurrentRound(0);
        const newTeam = invertColor(currentTeam);
        await db.collection("game")
            .doc(gameKeyword)
            .set({currentTeam: newTeam}, {merge: true});
    }, [currentTeam, invertColor, gameKeyword]);


    useEffect(() => {

        const dictionary = ['ведьма', 'век', 'великан', 'венец', 'вера', 'вертолёт', 'верфь', 'вес', 'весна', 'ветер',
            'вечер', 'взгляд', 'вид', 'вилка', 'вирус', 'виски', 'вода', 'водолаз', 'вождь', 'воздух', 'война', 'волна',
            'воля', 'вор', 'ворот', 'ворота', 'врач', 'время', 'выпечка', 'высота', 'выступление', 'гавань', 'газ', 'газель',
            'галоп', 'гвоздь', 'гений', 'герб', 'Германия', 'герой', 'гигант', 'глаз', 'Голливуд', 'голова', 'голос',
            'голубь', 'гольф', 'гора', 'горло', 'горн', 'город', 'Горький', 'град', 'гранат', 'гранит', 'гребень', 'Греция',
            'гриф', 'группа', 'груша', 'губа'];

        const chance1 = new Chance(gameKeyword);
        const colorOptions = chance1.shuffle([TEAM.red, TEAM.blue]);
        const colors = chance1.shuffle([
            COLOUR.black,
            ...Array((fieldSize - whiteWordsCount) / 2).fill(colorOptions[0]),
            ...Array((fieldSize - whiteWordsCount) / 2 - 1).fill(colorOptions[1]),
            ...Array(whiteWordsCount).fill(COLOUR.white)
        ]);

        const words = chance1.shuffle(dictionary).slice(0, fieldSize);

        const initialSetup = words.map((word, i) => ({word, color: colors[i], clicked: clickedData.includes(word)}));

        setGameData(initialSetup);
        setIsBlackWordClicked(false);
        if (clickedData.length === 0) {
            setCurrentTeam(colorOptions[0]);
        }
    }, [clickedData, gameKeyword]);


    useEffect(() => {

        db.collection("game")
            .doc(gameKeyword)
            .onSnapshot(querySnapshot => {
                setClickedData(querySnapshot.data()?.words || []);
                if (querySnapshot.data()?.currentTeam) {
                    setCurrentTeam(querySnapshot.data().currentTeam);
                }
            });

    }, [gameKeyword]);

    useEffect(() => {
        if (gameData.length > 0) {
            if (getWordsCount(TEAM.red) === 0) {
                setWinner(TEAM.red);
            } else if (getWordsCount(TEAM.blue) === 0) {
                setWinner(TEAM.blue);
            }
        }
    }, [gameData, getWordsCount]);

    useEffect(() => {
        if (gameData.filter(i => i.color === COLOUR.black && i.clicked).length > 0) {
            setIsBlackWordClicked(true);
        }

    }, [gameData]);


    const wordClickHandler = useCallback(async i => {
        if (playerRole === ROLE.player && !winner && !isBlackWordClicked) {
            setGameData([
                    ...gameData.slice(0, i),
                    {...gameData[i], clicked: true},
                    ...gameData.slice(i + 1)
                ]
            );
            await db.collection("game")
                .doc(gameKeyword)
                .set({words: [gameData[i].word, ...clickedData]}, {merge: true});
            if (gameData[i].color !== currentTeam) {
                await changeTeam();
            } else {
                setClicksCurrentRound(clicksCurrentRound + 1);
            }
        }
    }, [playerRole, clicksCurrentRound, winner, isBlackWordClicked, gameData, gameKeyword,
        clickedData, currentTeam, changeTeam]);

    const EndRoundButton = () => (playerRole === ROLE.player && clicksCurrentRound > 0 && !winner && !isBlackWordClicked) &&
        <button onClick={() => changeTeam()}>Закончить ход</button>

    const NewGameButton = () => <button onClick={onNewGameStart}>Новая игра</button>

    const TopBanner = () => {

        if (isBlackWordClicked) {
            return <div className={"top-banner black"}>Команда, нажавшая черное слово, проиграла{<EndRoundButton/>}{
                <NewGameButton/>}</div>
        }

        if (winner) {
            return <div className={"top-banner " + currentTeam}>{MESSAGES.WINNER[currentTeam]}{<EndRoundButton/>}{
                <NewGameButton/>}</div>
        }

        return <div className={"top-banner " + currentTeam}>{MESSAGES.YOUR_TURN[currentTeam]}{<EndRoundButton/>}{
            <NewGameButton/>}</div>
    }

    const WordsCounter = ({colour}) => <div className={"words-counter " + colour}>{getWordsCount(colour)}</div>

    const getClassNames = wordData => clsx("word", {
        [wordData.color]: (playerRole === ROLE.captain && wordData.color !== COLOUR.white) || wordData.clicked,
        'transparent': playerRole === ROLE.captain && wordData.clicked && wordData.color !== COLOUR.white
    });


    return <div className="game-field">
        <TopBanner/>
        <div className="field">
            {gameData.map((i, index) => <div
                id={index}
                key={i.word}
                className={getClassNames(i)}
                onClick={() => wordClickHandler(index)}
            >
                {i.word}
            </div>)}
        </div>
        <div className="bottom-banner">
            <WordsCounter colour={TEAM.red}/>
            <div className={"words-remaining"}>Слов осталось</div>
            <WordsCounter colour={TEAM.blue}/>
        </div>
    </div>
}

export default GameField;
