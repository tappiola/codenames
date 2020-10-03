import React, {useContext} from "react";
import "./RulesPopup.css";
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
        <div className="backdrop"/>
        <div className="rules">
            <button className="close-modal" onClick={onClose}>x</button>
            <h2 className="rules__title">{TEXTS.rules}</h2>
            <div className="rules__text">
                <RulesText/>
            </div>
        </div>
    </>
}
