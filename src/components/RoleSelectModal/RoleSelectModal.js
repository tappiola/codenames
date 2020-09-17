import {ROLE} from "../../constants";
import React, {useContext} from "react";
import './RoleSelectModal.css';
import {LanguageContext} from '../../App';

export const RoleSelect = ({onRoleSelect}) => {

    const TEXTS = useContext(LanguageContext);

    return <>
        <div className="backdrop"/>
        <div className="select-role">
            <div className="new-game__label">{TEXTS.toGame}</div>
            <button className="select-role__button"
                    onClick={() => onRoleSelect(ROLE.captain)}>{TEXTS.ROLE.captain}</button>
            <button className="select-role__button"
                    onClick={() => onRoleSelect(ROLE.player)}>{TEXTS.ROLE.player}</button>
        </div>
    </>
}
