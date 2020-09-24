import React from 'react';

import Style from './CustomButton.module.css';

const customButton = (props) => {
    return (
        <div className={Style.CustomButton}>
            <button onClick={props.OnClick}>{props.children}</button>
        </div>
    );
}

export default customButton;