import React, {useContext, useEffect, useState} from "react";
import classes from './NewGameModal.module.css';
import {ROLE} from '../../constants';
import {LanguageContext} from "../../App";
import {fetchKeywords} from "../../firebaseActions";
import {generateKeyword} from "../../service/wordGenerator";

const NewGameButton = ({role, newGameKeyword, onGameCreate, texts}) => <button
    className={classes.selectRoleButton}
    disabled={!newGameKeyword}
    onClick={() => onGameCreate(newGameKeyword, role)}
>{texts[role]}</button>

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

    if (isLoading) {
        return null
    }

    return <>
        <div className={classes.backdrop}/>
        <div className={classes.newGame}>
            {showCloseButton && <button className={classes.closeModal} onClick={onNewGameCancel}>x</button>}
            <div className={classes.labelBig}>{TEXTS.newGame}</div>
            <div>
                <input
                    className={classes.input}
                    placeholder={TEXTS.keyword}
                    maxLength="16"
                    onKeyDown={e => restrictInput(e)}
                    onChange={e => setNewGameKeyword(e.target.value.toLowerCase())}
                    value={newGameKeyword}
                />
                <button
                    className={classes.newGameButton}
                    onClick={() => setNewGameKeyword(generateKeyword(keywords))}
                >{TEXTS.changeKey}
                </button>
            </div>
            <div className={classes.roleButtons}>
                <div className={classes.label}>{TEXTS.toGame}</div>
                <div>
                    <NewGameButton
                        role={ROLE.captain}
                        newGameKeyword={newGameKeyword}
                        onGameCreate={onGameCreate}
                        texts={TEXTS.ROLE}
                    />
                    <NewGameButton
                        role={ROLE.player}
                        newGameKeyword={newGameKeyword}
                        onGameCreate={onGameCreate}
                        texts={TEXTS.ROLE}
                    />
                </div>
            </div>
        </div>
    </>
}
