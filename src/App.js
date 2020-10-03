import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import GameField from './components/GameField/GameField';
import {NewGameModal} from "./components/NewGameModal/NewGameModal";
import './App.css';
import {RoleSelect} from "./components/RoleSelectModal/RoleSelectModal";
import {LANGUAGES, LOCAL_STORAGE_KEY, TEXTS} from "./constants";
import {LanguageSelector} from "./components/LanguageSelector/LanguageSelector";
import {FullscreenButton} from "./components/Fullscreen/FullscreenButton";
import {RulesPopup} from "./components/Rules/RulesPopup";
import {RulesButton} from "./components/Rules/RulesButton";

export const LanguageContext = React.createContext();

function App() {
    const history = useHistory();
    const {location: {pathname}} = history;
    const [newGameSelectionMode, setNewGameSelectionMode] = useState(false);
    const [rulesDisplayed, setRulesDisplayed] = useState(false);
    const [gameKeyword, setGameKeyword] = useState('');
    const [playerRole, setPlayerRole] = useState(null);
    const [localizedTexts, setLocalizedTexts] = useState(
        TEXTS[localStorage.getItem(LOCAL_STORAGE_KEY) || LANGUAGES.RU]
    );

    useEffect(() => {
        const keyword = pathname.slice(1).toLowerCase();
        setGameKeyword(keyword);
        setNewGameSelectionMode(keyword.length === 0);
    }, [pathname])

    const gameCreateHandler = (keyword, role) => {
        history.push('/' + keyword);
        setPlayerRole(role);
        setGameKeyword(keyword);
        setNewGameSelectionMode(false);
    }

    const setLanguage = language => {
        setLocalizedTexts(TEXTS[language]);
        localStorage.setItem(LOCAL_STORAGE_KEY, language);
    }

    const BasicButtons = () => {
        return <div className="top-banner-sheer">
            <RulesButton onRulesClick={() => setRulesDisplayed(true)}/>
            <LanguageSelector className="language-selector-banner" onSetLanguage={setLanguage}/>
            <FullscreenButton/>
        </div>
    }

    return <LanguageContext.Provider value={localizedTexts}>
        {rulesDisplayed && <RulesPopup onClose={() => setRulesDisplayed(false)}/>}
        {(!gameKeyword || !playerRole) && <BasicButtons/>}
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
