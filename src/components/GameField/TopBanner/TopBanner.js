import clsx from "clsx";
import classes from "./TopBanner.module.css";
import colors from '../../../Colors.module.css';
import {LanguageSelector} from "../../LanguageSelector/LanguageSelector";
import {RulesButton} from "../../Rules/RulesButton";
import {FullscreenButton} from "../../Fullscreen/FullscreenButton";
import React, {useContext} from "react";
import {LanguageContext} from "../../../App";
import {ROLE} from "../../../constants";


export const TopBanner = (
    {
        isBlackWordClicked,
        currentTeam,
        winner,
        onSetLanguage,
        onRulesClick,
        onNewGameStart,
        onTeamChange,
        playerRole,
        clicksCurrentRound
    }) => {

    const TEXTS = useContext(LanguageContext);

    return (
        <div className={clsx(classes.topBanner, isBlackWordClicked ? colors.black : colors[currentTeam])}>
            <div className={classes.container}>
                    <span className={classes.status}>
                {isBlackWordClicked
                    ? TEXTS.blackWordClicked
                    : winner ? TEXTS.WINNER[currentTeam] : TEXTS.YOUR_TURN[currentTeam]
                }
                </span>
                {(playerRole === ROLE.player && clicksCurrentRound > 0 && !winner && !isBlackWordClicked) &&
                <button className={classes.button} onClick={onTeamChange}>{TEXTS.endTurn}</button>}
            </div>
            <div className={classes.container}>
                <button className={classes.button} onClick={onNewGameStart}>{TEXTS.newGame}</button>
                <LanguageSelector onSetLanguage={onSetLanguage}/>
                <RulesButton onRulesClick={onRulesClick}/>
                <FullscreenButton/>
            </div>
        </div>
    )
}
