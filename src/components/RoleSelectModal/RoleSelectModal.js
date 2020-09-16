import {ROLE} from "../../constants";
import React from "react";
import './RoleSelectModal.css';

export const RoleSelect = ({onRoleSelect}) => <>
    <div className="backdrop"/>
    <div className="select-role">
        <div className="new-game__label">Открыть игру как:</div>
        <button className="select-role__button" onClick={() => onRoleSelect(ROLE.captain)}>{ROLE.captain}</button>
        <button className="select-role__button" onClick={() => onRoleSelect(ROLE.player)}>{ROLE.player}</button>
    </div>
</>
