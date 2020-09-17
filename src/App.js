import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import GameField from './components/GameField/GameField';
import {NewGameModal} from "./components/NewGameModal/NewGameModal";
import './App.css';
import {RoleSelect} from "./components/RoleSelectModal/RoleSelectModal";
import {LANGUAGES, TEXTS} from "./constants";

export const LanguageContext = React.createContext();

function App() {
    const history = useHistory();
    const {location: {pathname}} = history;
    const [newGameSelectionMode, setNewGameSelectionMode] = useState(false);
    const [gameKeyword, setGameKeyword] = useState('');
    const [playerRole, setPlayerRole] = useState(null);
    const [localizedTexts, setLocalizedTexts] = useState(TEXTS[LANGUAGES.RU]);

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

    return <LanguageContext.Provider value={localizedTexts}>
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
            />)
        }
    </LanguageContext.Provider>
}

export default App;
