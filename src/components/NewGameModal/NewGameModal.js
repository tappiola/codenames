import React, {useContext, useState} from "react";
import './NewGameModal.css';
import {ROLE} from '../../constants';
import {generateRandomWord} from "../../service/wordGenerator";
import {LanguageContext} from "../../App";


export const NewGameModal = ({onGameCreate, onNewGameCancel, showCloseButton}) => {
    const TEXTS = useContext(LanguageContext);

    const [newGameKeyword, setNewGameKeyword] = useState(generateRandomWord());

    const ALWAYS_ALLOWED_KEYS = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    const restrictInput = e => {
        return (
            e.key.toUpperCase() < "A" || e.key.toUpperCase() > "Z")
            && (e.key.toUpperCase() < "А" || e.key.toUpperCase() > "Я")
            && !ALWAYS_ALLOWED_KEYS.includes(e.key)
            && e.preventDefault()
    }

    const NewGameButton = ({role}) => <button
        className="select-role__button"
        disabled={!newGameKeyword}
        onClick={() => onGameCreate(newGameKeyword, role)}
    >{TEXTS.ROLE[role]}</button>

    return <>
        <div className="backdrop"/>
        <div className="new-game">
            {showCloseButton && <button className="close-modal" onClick={onNewGameCancel}>x</button>}
            <div className="new-game__label-big">{TEXTS.newGame}</div>
            <div>
                <input
                    className="new-game__input"
                    placeholder={TEXTS.keyword}
                    maxLength="16"
                    onKeyDown={e => restrictInput(e)}
                    onChange={e => setNewGameKeyword(e.target.value.toLowerCase())}
                    value={newGameKeyword}
                />
                <button
                    className="new-game__button"
                    onClick={() => setNewGameKeyword(generateRandomWord())}
                >{TEXTS.changeKey}
                </button>
            </div>
            <div>
                <div className="new-game__label">{TEXTS.toGame}</div>
                <div>
                    <NewGameButton role={ROLE.captain}/>
                    <NewGameButton role={ROLE.player}/>
                </div>
            </div>
        </div>
    </>
}

