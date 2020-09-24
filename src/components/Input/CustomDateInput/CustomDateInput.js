import React from 'react';

import Style from './CustomDateInput.module.css';

const customDateInput = (props) => {
    return (
        <div className ={Style.CustomDateInput}>
            <input type="date" onChange={props.OnChange} value={props.Value}></input>
        </div>
    );
}

export default customDateInput;