import React from "react";


export const RulesButton = ({onRulesClick}) => {
    return (
        <span
            onClick={onRulesClick}
            style={{
                color: 'white',
                fontSize: '32px',
                cursor: 'pointer',
                paddingRight: '10px'
            }}>
            <i className="far fa-question-circle"/>
        </span>
    )
}
