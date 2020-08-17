import React from 'react';
export default class Home extends React.Component {
    componentDidMount() {
        document.title = "About";
    }

    render() {
        return(
            <>
            <h3>About Web Music App</h3>
            </>
        );
    }
};