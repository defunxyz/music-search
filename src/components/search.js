import React from 'react';
import Autosuggest from './Autosuggest';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            matches: []
        }
    }

    handleKeyChange = (e) => {
        this.setState({query: e.target.value});
        console.log(this.state.query);
    }

    handleKeyPress = (e) => {
        if(e === 'Enter') {

        }
    }

    render() {
        const {matches} = this.state;
        return (
            <section className="search-container">
                <div id="searchbox" className="searchbox" role="searchbox">
                    <form id="search-form">
                        <input 
                        type="search"
                        placeholder="Seach artists, songs, or lyrics" 
                        onChange={this.handleKeyChange} 
                        onKeyPress={this.handleKeyPress} />
                    </form>
                </div>
                <Autosuggest matches={matches} />
            </section>
        );
    }
};