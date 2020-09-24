import React from 'react';

import Style from './CustomTextArea.module.css';

const customTextArea = (props) => {
    return (
        <div className ={Style.CustomTextarea}>
            <textarea onChange={props.OnChange} value={props.Value}></textarea >
        </div>
    );
}

export default customTextArea;