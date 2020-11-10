import React from 'react';
import Autosuggest from './Autosuggest';
import { authSpotifyAPI, getSpotifyToken, searchSpotifyAPI, getArtistAlbumSpotify } from './api';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            spotify_token: {},
            matches: {},
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount(){
        if (Object.keys(this.state.spotify_token).length === 0) {
          this.authSpotify();
        }
    }

    authSpotify = async () => {
        let success = false;
        try{
          success = await authSpotifyAPI();
        } catch(e) {
          if(!this.state.error) {
            this.setState({
              error: true, 
              errorMessage: e.message
            });
          }
        }
    
        if(success) {
          this.setState({
            spotify_token: getSpotifyToken()
          });
    
          // Next line to be removed once localStorage is implemented
        }
    }

    searchSpotify = async (term, type) => {
        let response;
        try{
          response = await searchSpotifyAPI(term, type);
        } catch(e) {
          console.log(e.message);
        }
    
        if(response.success) {
          this.setState({
            matches: response.data.artists.items
          });
        }
    
        this.getAlbum(this.state.artist.id);
    }

    handleKeyChange = (e) => {
        this.setState({query: e.target.value});
        this.searchSpotify(this.state.query, "artist");
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