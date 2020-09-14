import React, {useState} from "react";
import './NewGameModal.css';
import {ROLE} from '../../App';


export const NewGameModal = props => {
    const [newGameKeyword, setNewGameKeyword] = useState('');

    const NewGameButton = data => <button
        className="select-role__button"
        disabled={!newGameKeyword}
        onClick={() => props.onGameCreate(newGameKeyword, data.role)}
    >{data.role}</button>

    return <div className="new-game">
        <button onClick={props.onNewGameCancel}>x</button>
        <div>Новая игра</div>
        <input
            className="new-game__input"
            placeholder="Ключевое слово"
            maxLength="16"
            onChange={e => setNewGameKeyword(e.target.value)}
            value={newGameKeyword}
        />
        <button>Сгенерировать другой ключ</button>
        <div>Открыть игру как:</div>
        <div>
            <NewGameButton role={ROLE.captain}/>
            <NewGameButton role={ROLE.player}/>
        </div>
    </div>
}

