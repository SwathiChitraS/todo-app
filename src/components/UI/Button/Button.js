import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
    return(
        <button onClick={props.click} 
        className= {[styles.Button, styles[props.buttonType]].join(' ')}>
            {props.children}
        </button>
    )
}

export default Button;