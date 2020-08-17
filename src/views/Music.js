import React from 'react';
export default class Music extends React.Component {
    componentDidMount() {
        document.title = "Music List";
    }

    render() {
        return(
            <>
            <h3>Your Music List</h3>
            </>
        );
    }
};