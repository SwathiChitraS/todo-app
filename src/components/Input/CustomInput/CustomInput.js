import React from 'react';

import Style from './CustomInput.module.css';

const customInput = (props) => {
    return (
        <div className ={Style.CustomInput}>
            <input type="text" onChange={props.OnChange} value={props.Value}></input>
        </div>
    );
}

export default customInput;