import React from 'react';

import Style from './CustomTimeInput.module.css';

const customTimeInput = (props) => {
    return (
        <div className ={Style.CustomTimeInput}>
            <input type="time" onChange={props.OnChange} value={props.Value}></input>
        </div>
    );
}

export default customTimeInput;