import React from "react";

export default class DialogsContainer extends React.Component 
{
    constructor(...args) {
        super(...args);
        this.state = {
            showChild: false
        }
    }

    closeChildDialog = () => {
        this.setState({
            showChild: false
        });
    }

    render = () => {
        return(
        <div id="dialog-container">
        </div>);
    }
};