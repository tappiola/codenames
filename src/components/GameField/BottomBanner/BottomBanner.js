import classes from "./BottomBanner.module.css";
import colors from '../../../Colors.module.css';
import {TEAM} from "../../../constants";
import React, {useContext} from "react";
import {LanguageContext} from "../../../App";

const WordsCounter = ({colour, onGetWordsCount}) => {
    return <div className={`${classes.wordsCounter} ${colors[colour]}`}>
        {onGetWordsCount(colour)}
    </div>
}

export const BottomBanner = ({onGetWordsCount}) => {
    const TEXTS = useContext(LanguageContext);

    return <div className={classes.bottomBanner}>
        <WordsCounter colour={TEAM.red} onGetWordsCount={onGetWordsCount}/>
        <div className={classes.wordsRemaining}>{TEXTS.wordsRemaining}</div>
        <WordsCounter colour={TEAM.blue} onGetWordsCount={onGetWordsCount}/>
    </div>
}
