import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import GameField from './components/GameField/GameField';
import {NewGameModal} from "./components/NewGameModal/NewGameModal";
import './App.css';
import {RoleSelect} from "./components/RoleSelectModal/RoleSelectModal";

function App() {
    const history = useHistory();
    const [newGameSelectionMode, setNewGameSelectionMode] = useState(false);
    const [gameKeyword, setGameKeyword] = useState('');
    const [playerRole, setPlayerRole] = useState(null);

    useEffect(() => {
        const keyword = history.location.pathname.slice(1).toLowerCase();
        setGameKeyword(keyword);
        setNewGameSelectionMode(keyword.length === 0);
    }, [history.location])

    const gameCreateHandler = (keyword, role) => {
        history.push('/' + keyword);
        setPlayerRole(role);
        setGameKeyword(keyword);
        setNewGameSelectionMode(false);
    }

    return <>
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
    </>
}

export default App;
