import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Chance from 'chance';
import {useHistory} from 'react-router-dom';

const TEAM = {
    red: 'red',
    blue: 'blue'
}

function App() {

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

    const invertColor = useCallback((color) => color === TEAM.red ? TEAM.blue : TEAM.red, []);
    const getWordsCount = colour => gameData.filter(i => i.color === colour && i.clicked === false).length;

    const {location} = useHistory();
    const [isGameCreated, setIsGameCreated] = useState(false);
    const [gameData, setGameData] = useState([]);
    const [currentTeam, setCurrentTeam] = useState();
    const [isBlackWordClicked, setIsBlackWordClicked] = useState(false);
    const [winner, setWinner] = useState();

    useEffect(() => {

        const dictionary = ['ведьма', 'век', 'великан', 'венец', 'вера', 'вертолёт', 'верфь', 'вес', 'весна', 'ветер',
            'вечер', 'взгляд', 'вид', 'вилка', 'вирус', 'виски', 'вода', 'водолаз', 'вождь', 'воздух', 'война', 'волна',
            'воля', 'вор', 'ворот', 'ворота', 'врач', 'время', 'выпечка', 'высота', 'выступление', 'гавань', 'газ', 'газель',
            'галоп', 'гвоздь', 'гений', 'герб', 'Германия', 'герой', 'гигант', 'глаз', 'Голливуд', 'голова', 'голос',
            'го­лубь', 'гольф', 'гора', 'горло', 'горн', 'город', 'Горький', 'град', 'гранат', 'гранит', 'гребень', 'Греция',
            'гриф', 'группа', 'груша', 'губа'];

        const chance1 = new Chance(location.pathname);
        const colorOptions = chance1.shuffle([TEAM.red, TEAM.blue]);
        const colors = chance1.shuffle([
            'black',
            ...Array((fieldSize - whiteWordsCount) / 2).fill(colorOptions[0]),
            ...Array((fieldSize - whiteWordsCount) / 2 - 1).fill(colorOptions[1]),
            ...Array(whiteWordsCount).fill("white")
        ]);

        const words = chance1.shuffle(dictionary).slice(0, fieldSize);

        const initialSetup = words.map((word, i) => ({word, color: colors[i], clicked: false}));

        setGameData(initialSetup);
        setCurrentTeam(colorOptions[0]);
        setIsGameCreated(true);
    }, [location]);

    useEffect(() => {

        if (isGameCreated) {
            console.log(getWordsCount(TEAM.red));
            console.log(getWordsCount(TEAM.blue));
            if (getWordsCount(TEAM.red) === 0) {
                setWinner(TEAM.red);
            } else if (getWordsCount(TEAM.blue) === 0) {
                setWinner(TEAM.blue);
            }
        }
    }, [gameData]);

    const wordClickHandler = useCallback((i) => {
        if (!winner && !isBlackWordClicked) {
            setGameData([
                    ...gameData.slice(0, i),
                    {...gameData[i], clicked: true},
                    ...gameData.slice(i + 1)
                ]
            );
            if (gameData[i].color === "black") {
                setIsBlackWordClicked(true);
            } else if (gameData[i].color !== currentTeam) {
                setCurrentTeam(invertColor(currentTeam));
            }
        }
    }, [gameData, currentTeam]);

    const TopBanner = () => {
        if (isBlackWordClicked) {
            return <div className={"top-banner black"}>Команда, нажавшая черное слово, проиграла</div>
        }

        if (winner) {
            return <div className={"top-banner " + currentTeam}>{MESSAGES.WINNER[currentTeam]}</div>
        }

        return <div className={"top-banner " + currentTeam}>{MESSAGES.YOUR_TURN[currentTeam]}</div>
    }

    const WordsCounter = props => <div className={"words-counter " + props.colour}>{getWordsCount(props.colour)}</div>

    return (
        <>
            <TopBanner/>
            <div className="field">
                {gameData.map((i, index) => <div
                    id={index}
                    key={i.word}
                    className={"word " + (i.clicked ? i.color : "default")}
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
        </>
    );
}

export default App;
