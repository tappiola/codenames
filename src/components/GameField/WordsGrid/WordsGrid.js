import classes from "./WordsGrid.module.css";
import React from "react";
import clsx from "clsx";
import {COLOUR, ROLE} from "../../../constants";
import colors from '../../../Colors.module.css';

export const WordsGrid = ({gameData, onWordClick, playerRole}) => {
    const getClassNames = wordData => clsx(classes.word, {
        [colors[wordData.color]]: (playerRole === ROLE.captain && wordData.color !== COLOUR.white) || wordData.clicked,
        [colors.transparent]: playerRole === ROLE.captain && wordData.clicked && wordData.color !== COLOUR.white
    });

    return <div className={classes.field}>
        {gameData.map((data, index) => <div
            id={index}
            key={data.word}
            className={getClassNames(data)}
            onClick={() => onWordClick(index)}
        >
            {data.word}
        </div>)}
    </div>
}
