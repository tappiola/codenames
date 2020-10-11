import React, {useContext} from "react";
import classes from "./RulesPopup.module.css";
import {RULES_EN, RULES_RU} from './RulesTexts';
import {LANGUAGES} from "../../constants";
import {LanguageContext} from "../../App";

const RULES_TEXT = {
    [LANGUAGES.RU]: RULES_RU,
    [LANGUAGES.EN]: RULES_EN
}

export const RulesPopup = ({onClose}) => {
    const TEXTS = useContext(LanguageContext);
    const {language} = TEXTS;
    const RulesText = RULES_TEXT[language];

    return <>
        <div className={classes.backdrop}/>
        <div className={classes.rules}>
            <button className={classes.closeModal} onClick={onClose}>x</button>
            <h2 className={classes.rulesTitle}>{TEXTS.rules}</h2>
            <div className={classes.rulesText}>
                <RulesText/>
            </div>
        </div>
    </>
}
