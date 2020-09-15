import React, {useState} from "react";
import './NewGameModal.css';
import {ROLE} from '../../App';


export const NewGameModal = ({onGameCreate, onNewGameCancel, showOnlyModal}) => {
    const [newGameKeyword, setNewGameKeyword] = useState('');

    const ALWAYS_ALLOWED_KEYS = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    const restrictInput = e => {
        return (
            e.key.toUpperCase() < "A" || e.key.toUpperCase() > "Z")
            && (e.key.toUpperCase() < "А" || e.key.toUpperCase() > "Я")
            && !ALWAYS_ALLOWED_KEYS.includes(e.key)
            && e.preventDefault()
    }

    const NewGameButton = data => <button
        className="select-role__button"
        disabled={!newGameKeyword}
        onClick={() => onGameCreate(newGameKeyword, data.role)}
    >{data.role}</button>

    return <div className="new-game">
        {showOnlyModal || <button onClick={onNewGameCancel}>x</button>}
        <div>Новая игра</div>
        <input
            className="new-game__input"
            placeholder="Ключевое слово"
            maxLength="16"
            onKeyDown={e => restrictInput(e)}
            onChange={e => setNewGameKeyword(e.target.value.toLowerCase())}
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

