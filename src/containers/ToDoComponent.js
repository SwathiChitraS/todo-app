import { render } from '@testing-library/react';
import React, { Component } from 'react';

import Styles from './ToDoComponent.module.css';
import Card from '../components/Card/Card';
import CardItems from '../components/Card/CardItems/CardItems';
import CustomDateInput from '../components/Input/CustomDateInput/CustomDateInput';
import CustomTimeInput from '../components/Input/CustomTimeInput/CustomTimeInput';
import CustomInput from '../components/Input/CustomInput/CustomInput';
import CustomTextArea from '../components/Input/CustomTextArea/CustomTextArea';
import CustomButton from '../components/Input/CustomButton/CustomButton';
// import { Button } from 'react-bootstrap';
// import { Button } from '@material-ui/core';
import axios from 'axios';


class ToDoComponent extends Component {

    state = {
        items: {},
        subject: [],
        currentState: this.props.location.state,
        prevState: ''
    }
    componentDidMount() {
        this.doCall()

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.location.state !== prevState.currentState) {
            return {
                currentState: nextProps.location.state
            }
        }
        return null;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.state !== this.state.currentState) {
            this.doCall();
        }
    }
    doCall = () => {
        let searchData = '';
        if (this.props.location.state && this.props.location.state !== '' && !this.props.location.state !== 'Today') {
            searchData = this.props.location.state;
            axios.get("your firebase URL" + searchData + ".json")
                .then(response => {
                    if (response.data !== null) {
                        let items = [];
                        let subject = [];
                        let tempData = {};
                        tempData[searchData] = {
                            ...response.data
                        };
                        this.setState({ items: tempData, subject: subject, prevState: this.props.location.state });
                    } else {
                        let tempData = {};
                        tempData[searchData] = {
                        };
                        this.setState({ items: tempData, subject: [], prevState: this.props.location.state });
                    }
                });
        } else {
            axios.get("your firebase URL")
                .then(response => {
                    if (response.data !== null) {
                        let items = [];
                        let subject = [];
                        let tempData = {
                            ...response.data
                        };
                        this.setState({ items: tempData, subject: subject, prevState: this.props.location.state });
                    }
                });
        }
    }
    stateChangeHandler = (event, key, parentKey) => {
        let details = {
            ...this.state.items[parentKey][key],
            completed: event.target.checked
        }
        let data = {
            ...this.state.items[parentKey],
        };
        data[key] = details;
        this.eventTarget = event.target;
        this.currentData = details;
        axios.put("your firebase URL" + parentKey + ".json", data)
            .then((response) => {
                if (this.currentData['completed']) {
                    this.eventTarget.parentElement.style.setProperty("opacity", 0.5);
                } else {
                    this.eventTarget.parentElement.style.setProperty("opacity", "");
                }
                this.eventTarget.checked = this.currentData['completed'];
            }, this);
    }
    DeleteHandler = (event, key, parentKey) => {
        let details = {
            ...this.state.items[parentKey][key],
            completed: event.target.checked
        }
        let data = {
            ...this.state.items[parentKey],
        };
        data[key] = details;
        let updatedState = JSON.parse(JSON.stringify(this.state.items));
        delete updatedState[parentKey][key]
        this.setState({items: updatedState});
        this.eventTarget = event.target;
        this.currentData = details;
        axios.delete("your firebase URL" + parentKey + "/" + key + ".json", data)
            .then((response) => {
            }, this);
    }
    render() {
        let cardItemsSplit = [];
        for (var dateKey in this.state.items) {
            let cardItems = [];
            for (var key in this.state.items[dateKey]) {
                let checked = "";
                if (this.state.items[dateKey][key]["completed"]) {
                    checked = true
                }
                cardItems.push(
                    <CardItems key={key} Key={key} ParentKey={dateKey} Checked={checked}
                        Description={this.state.items[dateKey][key].description}
                        Date={dateKey} Time={this.state.items[dateKey][key].time}
                        DeleteClick={(event, key, parentKey) => { this.DeleteHandler(event, key, parentKey) }}
                        OnChange={(event, key, parentKey) => { this.stateChangeHandler(event, key, parentKey) }}>
                        {this.state.items[dateKey][key].subject}
                    </CardItems>
                );
            }
            cardItemsSplit.push(<div key={dateKey}>
                <h3 className={Styles.HeaderTextAlign}>{dateKey}</h3>
                <div className={Styles.CardALignment}>
                    {cardItems}
                </div>
            </div>)
        }
        return (
            <div className={Styles.ToDoComponent}>
                <p className={Styles.HideComponent}>{this.state.currentState}</p>
                <Card Classes={Styles.AvailableItems}>
                    {cardItemsSplit}
                </Card>
            </div>
        );
    }
}

export default ToDoComponent;