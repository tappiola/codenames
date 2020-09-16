import React, {useCallback, useEffect, useState} from 'react';
import clsx from 'clsx';
import './GameField.css';
import {fetchGameData, updateCurrentTeam, updateGameStatus} from "../../firebaseActions";
import {COLOUR, ROLE, TEAM} from '../../constants';
import {generateGame} from "../../service/wordGenerator";

const GameField = ({gameKeyword, playerRole, onNewGameStart}) => {

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
        await updateCurrentTeam(gameKeyword, newTeam);
    }, [currentTeam, invertColor, gameKeyword]);


    useEffect(() => {

        const [gameSetup, firstTeam] = generateGame(gameKeyword);
        const initialSetup = gameSetup.map(wordData => ({
            ...wordData,
            clicked: clickedData.includes(wordData.word)
        }));

        setGameData(initialSetup);
        setIsBlackWordClicked(false);
        if (clickedData.length === 0) {
            setCurrentTeam(firstTeam);
        }
    }, [clickedData, gameKeyword]);


    useEffect(() => {
        fetchGameData(gameKeyword, querySnapshot => {
            setClickedData(querySnapshot.data()?.words || []);
            if (querySnapshot.data()?.currentTeam) {
                setCurrentTeam(querySnapshot.data().currentTeam);
            }

        })
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
        if (playerRole === ROLE.player && !winner && !isBlackWordClicked && !gameData[i].clicked) {
            setGameData([
                    ...gameData.slice(0, i),
                    {...gameData[i], clicked: true},
                    ...gameData.slice(i + 1)
                ]
            );
            await updateGameStatus(gameKeyword, {words: [gameData[i].word, ...clickedData]});
            if (gameData[i].color !== currentTeam) {
                await changeTeam();
            } else {
                setClicksCurrentRound(clicksCurrentRound + 1);
            }
        }
    }, [playerRole, clicksCurrentRound, winner, isBlackWordClicked, gameData, gameKeyword,
        clickedData, currentTeam, changeTeam]);

    const EndRoundButton = () => (playerRole === ROLE.player && clicksCurrentRound > 0 && !winner && !isBlackWordClicked) &&
        <button className="top-banner__button" onClick={() => changeTeam()}>Закончить ход</button>

    const NewGameButton = () => <button className="top-banner__button" onClick={onNewGameStart}>Новая игра</button>

    const TopBanner = () => {
        return (
            <div className={clsx("top-banner", isBlackWordClicked ? 'black' : currentTeam)}>
                <div className="top-banner__container">
                    <span className="top-banner__status">
                {isBlackWordClicked
                    ? "Команда, нажавшая черное слово, проиграла"
                    : winner ? MESSAGES.WINNER[currentTeam] : MESSAGES.YOUR_TURN[currentTeam]
                }
                </span>
                    <EndRoundButton/>
                </div>
                <NewGameButton/>
            </div>
        )
    }

    const WordsCounter = ({colour}) => <div className={"words-counter " + colour}>{getWordsCount(colour)}</div>

    const getClassNames = wordData => clsx("word", {
        [wordData.color]: (playerRole === ROLE.captain && wordData.color !== COLOUR.white) || wordData.clicked,
        'transparent': playerRole === ROLE.captain && wordData.clicked && wordData.color !== COLOUR.white,
        'opened': wordData.clicked
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
