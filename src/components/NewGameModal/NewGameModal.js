import React, {useContext, useEffect, useState} from "react";
import './NewGameModal.css';
import {ROLE} from '../../constants';
import {LanguageContext} from "../../App";
import {fetchKeywords} from "../../firebaseActions";
import {generateKeyword} from "../../service/wordGenerator";


export const NewGameModal = ({onGameCreate, onNewGameCancel, showCloseButton}) => {
    const TEXTS = useContext(LanguageContext);
    const {language} = TEXTS;

    const [keywords, setKeywords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchKeywords(language).then(words => {
            setKeywords(words);
            setIsLoading(false);
        })
    }, [language])

    useEffect(() => {
        keywords.length > 0 && setNewGameKeyword(generateKeyword(keywords));
    }, [keywords])

    const [newGameKeyword, setNewGameKeyword] = useState('');

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

    if (isLoading) {
        return null
    }

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
                    onClick={() => setNewGameKeyword(generateKeyword(keywords))}
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
