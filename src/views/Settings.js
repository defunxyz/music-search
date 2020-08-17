import React from 'react';
export default class Settings extends React.Component {
    componentDidMount() {
        document.title = "Settings";
    }

    render() {
        return(
            <>
            <h3>Settings</h3>
            </>
        );
    }
};