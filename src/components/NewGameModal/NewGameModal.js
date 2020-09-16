import React, {useState} from "react";
import './NewGameModal.css';
import {ROLE} from '../../constants';
import {generateRandomWord} from "../../service/wordGenerator";


export const NewGameModal = ({onGameCreate, onNewGameCancel, showOnlyModal}) => {
    const [newGameKeyword, setNewGameKeyword] = useState(generateRandomWord());

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

    return <>
        <div className="backdrop"/>
        <div className="new-game">
            {showOnlyModal || <button onClick={onNewGameCancel}>x</button>}
            <div className="new-game__label-big">Новая игра</div>
            <div>
                <input
                    className="new-game__input"
                    placeholder="Ключевое слово"
                    maxLength="16"
                    onKeyDown={e => restrictInput(e)}
                    onChange={e => setNewGameKeyword(e.target.value.toLowerCase())}
                    value={newGameKeyword}
                />
                <button
                    className="new-game__button"
                    onClick={() => setNewGameKeyword(generateRandomWord())}
                >Сгенерировать другой ключ</button>
            </div>
            <div>
                <div className="new-game__label">Открыть игру как:</div>
                <div>
                    <NewGameButton role={ROLE.captain}/>
                    <NewGameButton role={ROLE.player}/>
                </div>
            </div>
        </div>
    </>
}

