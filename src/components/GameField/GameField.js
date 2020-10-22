import React, {useCallback, useContext, useEffect, useState} from 'react';
import classes from './GameField.module.css';
import {fetchGameData, updateCurrentTeam, updateGameStatus} from "../../firebaseActions";
import {COLOUR, ROLE, TEAM} from '../../constants';
import {generateGame} from "../../service/wordGenerator";
import {LanguageContext} from "../../App";
import {TopBanner} from "./TopBanner/TopBanner";
import {WordsGrid} from "./WordsGrid/WordsGrid";
import {BottomBanner} from "./BottomBanner/BottomBanner";

const GameField = ({gameKeyword, playerRole, onNewGameStart, onSetLanguage, onRulesClick}) => {

    const {language} = useContext(LanguageContext);
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

    return <div className={classes.gameField}>
        <TopBanner
            onSetLanguage={onSetLanguage}
            onRulesClick={onRulesClick}
            isBlackWordClicked={isBlackWordClicked}
            currentTeam={currentTeam}
            winner={winner}
            onNewGameStart={onNewGameStart}
            onTeamChange={changeTeam}
            playerRole={playerRole}
            clicksCurrentRound={clicksCurrentRound}
        />
        <WordsGrid
            gameData={gameData}
            onWordClick={wordClickHandler}
            playerRole={playerRole}
        />
        <BottomBanner onGetWordsCount={getWordsCount}/>
    </div>
}

export default GameField;
