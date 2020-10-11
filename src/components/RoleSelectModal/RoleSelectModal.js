import {ROLE} from "../../constants";
import React, {useContext} from "react";
import classes from './RoleSelectModal.module.css';
import {LanguageContext} from '../../App';

export const RoleSelect = ({onRoleSelect}) => {

    const TEXTS = useContext(LanguageContext);

    return <>
        <div className={classes.backdrop}/>
        <div className={classes.selectRole}>
            <div className={classes.label}>{TEXTS.toGame}</div>
            <button className={classes.selectRoleButton}
                    onClick={() => onRoleSelect(ROLE.captain)}>{TEXTS.ROLE.captain}</button>
            <button className={classes.selectRoleButton}
                    onClick={() => onRoleSelect(ROLE.player)}>{TEXTS.ROLE.player}</button>
        </div>
    </>
}
