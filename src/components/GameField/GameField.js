import React, {useCallback, useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import './GameField.css';
import {fetchGameData, updateCurrentTeam, updateGameStatus} from "../../firebaseActions";
import {COLOUR, ROLE, TEAM} from '../../constants';
import {generateGame} from "../../service/wordGenerator";
import {LanguageContext} from "../../App";

const GameField = ({gameKeyword, playerRole, onNewGameStart}) => {

    const TEXTS = useContext(LanguageContext);
    const {language} = TEXTS;

    const [gameConfig, setGameConfig] = useState([]);
    const [firstTeam, setFirstTeam] = useState(null);
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
        await updateCurrentTeam(gameKeyword, language, newTeam);
    }, [invertColor, currentTeam, gameKeyword, language]);


    useEffect(() => {

        const setupGame = async () => {
            setIsBlackWordClicked(false);
            setWinner(null);
            setClicksCurrentRound(0);
            const [gameSetup, firstTeam] = await generateGame(gameKeyword, language);

            setGameConfig(gameSetup);
            setIsBlackWordClicked(false);
            setFirstTeam(firstTeam);
        }
        setupGame();
    }, [language, gameKeyword]);

    useEffect(() => {
        const gameSetup = gameConfig.map(wordData => ({
            ...wordData,
            clicked: clickedData.includes(wordData.word)
        }));

        setGameData(gameSetup);
    }, [clickedData, gameConfig])


    useEffect(() => {
        fetchGameData(gameKeyword, language, querySnapshot => {
            setClickedData(querySnapshot.data()?.words || []);
            setCurrentTeam(querySnapshot.data()?.currentTeam ? querySnapshot.data().currentTeam : firstTeam);
        })
    }, [firstTeam, gameKeyword, language]);

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
            await updateGameStatus(gameKeyword, language, {words: [gameData[i].word, ...clickedData]});
            if (gameData[i].color !== currentTeam) {
                await changeTeam();
            } else {
                setClicksCurrentRound(clicksCurrentRound + 1);
            }
        }
    }, [language, playerRole, clicksCurrentRound, winner, isBlackWordClicked, gameData, gameKeyword,
        clickedData, currentTeam, changeTeam]);

    const EndRoundButton = () => (playerRole === ROLE.player && clicksCurrentRound > 0 && !winner && !isBlackWordClicked) &&
        <button className="top-banner__button" onClick={() => changeTeam()}>{TEXTS.endTurn}</button>

    const NewGameButton = () => <button className="top-banner__button" onClick={onNewGameStart}>{TEXTS.newGame}</button>

    const TopBanner = () => {
        return (
            <div className={clsx("top-banner", isBlackWordClicked ? 'black' : currentTeam)}>
                <div className="top-banner__container">
                    <span className="top-banner__status">
                {isBlackWordClicked
                    ? TEXTS.blackWordClicked
                    : winner ? TEXTS.WINNER[currentTeam] : TEXTS.YOUR_TURN[currentTeam]
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
            <div className={"words-remaining"}>{TEXTS.wordsRemaining}</div>
            <WordsCounter colour={TEAM.blue}/>
        </div>
    </div>
}

export default GameField;
