import React, {useContext} from "react";
import {LanguageContext} from "../../App";


export const RulesButton = ({onRulesClick}) => {
    const TEXTS = useContext(LanguageContext);
    return <button onClick={onRulesClick} className="top-banner__button">{TEXTS.rules}</button>
}
