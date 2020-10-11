import classes from './LanguageSelector.module.css';
import logoEn from '../../images/lang-en.png';
import logoRu from '../../images/lang-ru.png';
import React from "react";
import {LANGUAGES} from "../../constants";

export const LanguageSelector = ({onSetLanguage}) => {

    return <div className={classes.selector}>
        <img src={logoEn} alt="flag-en" onClick={() => onSetLanguage(LANGUAGES.EN)}/>
        <img src={logoRu} alt="flag-ru" onClick={() => onSetLanguage(LANGUAGES.RU)}/>
    </div>
}
