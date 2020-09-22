import './LanguageSelector.css';
import logoEn from '../../images/lang-en.png';
import logoRu from '../../images/lang-ru.png';
import React from "react";
import {LANGUAGES} from "../../constants";

export const LanguageSelector = ({className, onSetLanguage}) => {

    return <div className={className}>
        <img src={logoEn} alt="flag-en" onClick={() => onSetLanguage(LANGUAGES.EN)}/>
        <img src={logoRu} alt="flag-ru" onClick={() => onSetLanguage(LANGUAGES.RU)}/>
    </div>
}
