import React from 'react';

import Style from './CardItems.module.css';
import Icon from '@material-ui/core/Icon';

const CardItems = (props) => {
    const cardItemsClass = [Style.CardItems];
    const checkboxClasses= [Style.Checkbox];
    const deleteClass = [Style.CloseIcon];
    const scheduleStyle = [Style.Schedule]
    if(props.hideCheckbox){
        checkboxClasses.push(Style.HideCheckbox);
        deleteClass.push(Style.HideCheckbox);
        scheduleStyle.push(Style.HideCheckbox);
        cardItemsClass.push(Style.CardFull);
    }
    return (
        <div className ={cardItemsClass.join(" ")} style={props.Checked ? {"opacity" : 0.5} : {"opacity" : ""}}>
            {
                props.Checked ?
                <input type="checkbox" className ={checkboxClasses.join(" ")} 
                    onChange={(event)=>props.OnChange(event,props.Key, props.ParentKey)} checked></input> :
                    <input type="checkbox" className ={checkboxClasses.join(" ")} 
                    onChange={(event)=>props.OnChange(event,props.Key, props.ParentKey)}></input>   

            }
            <div className ={deleteClass.join(" ")} onClick={(event)=>props.DeleteClick(event,props.Key, props.ParentKey)}><Icon>close</Icon></div>
            <div className ={[Style.Text, Style.Subject].join(" ")}>{props.children}</div>
            <div className ={[Style.Text, Style.Description].join(" ")}>{props.Description}</div>
            <div className={scheduleStyle.join(" ")}>
                <div className={Style.DateDiv}>
                    <Icon>event</Icon>
                    <p title={props.Date}>{props.Date}</p>
                </div>
                <div className={Style.TimeDiv}>
                    <Icon>timer</Icon>
                    <p title={props.Time}>{props.Time}</p>
                </div>
            </div>
        </div>
    );
}

export default CardItems;