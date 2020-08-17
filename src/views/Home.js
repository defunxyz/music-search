import React from 'react';
export default class Home extends React.Component {
    componentDidMount() {
        document.title = "Welcome to Web Music App";
    }

    render() {
        return(
            <>
            <h3>Welcome to Web Music App</h3>
            </>
        );
    }
};