import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import GameField from './components/GameField/GameField';
import {NewGameModal} from "./components/NewGameModal/NewGameModal";
import {RoleSelect} from "./components/RoleSelectModal/RoleSelectModal";
import {LANGUAGES, LOCAL_STORAGE_KEY, TEXTS} from "./constants";
import {LanguageSelector} from "./components/LanguageSelector/LanguageSelector";
import {FullscreenButton} from "./components/Fullscreen/FullscreenButton";
import {RulesPopup} from "./components/Rules/RulesPopup";
import {RulesButton} from "./components/Rules/RulesButton";
import classes from './App.module.css';

export const LanguageContext = React.createContext();

const BasicButtons = ({onSetLanguage, onSetRulesDisplayed}) => {
    return <div className={classes.topBannerSheer}>
        <LanguageSelector onSetLanguage={onSetLanguage}/>
        <RulesButton onRulesClick={() => onSetRulesDisplayed(true)}/>
        <FullscreenButton/>
    </div>
}

const App = () => {
    const location = useLocation();
    const {pathname} = location;
    const navigate = useNavigate();
    const [newGameSelectionMode, setNewGameSelectionMode] = useState(false);
    const [rulesDisplayed, setRulesDisplayed] = useState(false);
    const [gameKeyword, setGameKeyword] = useState('');
    const [playerRole, setPlayerRole] = useState(null);
    const [localizedTexts, setLocalizedTexts] = useState(
        TEXTS[localStorage.getItem(LOCAL_STORAGE_KEY) || LANGUAGES.EN]
    );

    useEffect(() => {
        const keyword = pathname.slice(1).toLowerCase();
        setGameKeyword(keyword);
        setNewGameSelectionMode(keyword.length === 0);
    }, [pathname])

    const gameCreateHandler = (keyword, role) => {
        navigate('/' + keyword);
        setPlayerRole(role);
        setGameKeyword(keyword);
        setNewGameSelectionMode(false);
    }

    const setLanguage = language => {
        setLocalizedTexts(TEXTS[language]);
        localStorage.setItem(LOCAL_STORAGE_KEY, language);
    }

    return <LanguageContext.Provider value={localizedTexts}>
        {rulesDisplayed && <RulesPopup onClose={() => setRulesDisplayed(false)}/>}
        {(!gameKeyword || !playerRole) && (
            <BasicButtons
                onSetLanguage={setLanguage}
                onSetRulesDisplayed={setRulesDisplayed}
            />)}
        {newGameSelectionMode && <NewGameModal
            onGameCreate={gameCreateHandler}
            onNewGameCancel={() => setNewGameSelectionMode(false)}
            showCloseButton={gameKeyword.length > 0}
        />}
        {gameKeyword && (!playerRole
            ? <RoleSelect onRoleSelect={role => setPlayerRole(role)}/>
            : <GameField
                gameKeyword={gameKeyword}
                playerRole={playerRole}
                onNewGameStart={() => setNewGameSelectionMode(true)}
                onSetLanguage={setLanguage}
                onRulesClick={() => setRulesDisplayed(true)}
            />)
        }
    </LanguageContext.Provider>
}

export default App;
