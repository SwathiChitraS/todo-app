import React from 'react';

import Style from './Card.module.css';

const card = (props) => {
    return (
        <div className ={[Style.Card, props.Classes].join(" ")}>
            {props.children}
        </div>
    );
}

export default card;