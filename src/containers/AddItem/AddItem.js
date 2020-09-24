import { render } from '@testing-library/react';
import React, { Component } from 'react';

import Styles from './AddItem.module.css';
import Card from '../../components/Card/Card';
import CardItems from '../../components/Card/CardItems/CardItems';
import CustomDateInput from '../../components/Input/CustomDateInput/CustomDateInput';
import CustomTimeInput from '../../components/Input/CustomTimeInput/CustomTimeInput';
import CustomInput from '../../components/Input/CustomInput/CustomInput';
import CustomTextArea from '../../components/Input/CustomTextArea/CustomTextArea';
import CustomButton from '../../components/Input/CustomButton/CustomButton';
// import { Button } from 'react-bootstrap';
// import { Button } from '@material-ui/core';
import axios from 'axios';


class AddItem extends Component {

    state = {
        date: '',
        time: '',
        subject: '',
        description: '',
        completed: false,
        validated: false
    }

    clickHandler = () => {
        let data = {
            ...this.state
        }
        if (this.state.date !== '' && this.state.time !== '' && this.state.subject !== '' && this.state.description !== '') {
            axios.post("your firebase URL" + this.state.date + ".json", data)
                .then(response => {
                    this.cancelHandler();
                });
        } else {
            let validated = true;
            this.setState({validated: validated});
        }
    };

    cancelHandler = () => {
        var updatedState = {
            ...this.state,
            date: '',
            time: '',
            subject: '',
            description: '',
            completed: false,
            validated: false
        };
        this.setState(updatedState);
    }

    render() {
        return (
            <div className={Styles.AddItem}>
                <Card>
                    <CardItems hideCheckbox={true}>
                        <div className={this.state.validated ? Styles.Show : Styles.Hide}>
                            <h4>Fill The Necessary Fields</h4>
                        </div>
                        <div className={Styles.ButtonAlign}>
                            <CustomButton OnClick={this.clickHandler} >Save</CustomButton>
                            <CustomButton OnClick={this.cancelHandler}>Cancel</CustomButton>
                        </div>
                        <div className={Styles.MarginPadding}>
                            <p>Date</p>
                            <CustomDateInput OnChange={(event) => this.setState({ "date": event.target.value })}
                                Value={this.state.date}></CustomDateInput>
                        </div>
                        <div className={Styles.MarginPadding}>
                            <p>Time</p>
                            <CustomTimeInput OnChange={(event) => this.setState({ "time": event.target.value })}
                                Value={this.state.time}></CustomTimeInput>
                        </div>
                        <div className={Styles.MarginPadding}>
                            <p>Subject</p>
                            <CustomInput OnChange={(event) => this.setState({ "subject": event.target.value })}
                                Value={this.state.subject}></CustomInput>
                        </div>
                        <div className={Styles.MarginPadding}>
                            <p>Description</p>
                            <CustomTextArea OnChange={(event) => this.setState({ "description": event.target.value })}
                                Value={this.state.description}></CustomTextArea>
                        </div>
                    </CardItems>
                </Card>
            </div>
        );
    }
}

export default AddItem;