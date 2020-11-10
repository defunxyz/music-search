import React from 'react';
import Autosuggest from './Autosuggest';
import { authSpotifyAPI, getSpotifyToken, searchSpotifyAPI, getArtistAlbumSpotify } from '../api';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            cursor: 0,
            spotify_token: {},
            matches: [],
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
        }
    }

    searchSpotify = async (term, type) => {
        let response;
        let matches = []
        if(term.length > 0)
        {
          const regex = new RegExp(`^${term}`, 'i');

          try{
            response = await searchSpotifyAPI(term, type);
          } catch(e) {
            console.log(e.message);
          }
      
          if(response.success) {
            matches = response.data.artists.items;
            this.setState(() => ({matches}));
          }
        }
        else {
          this.setState({ matches: [] });
        }
    }

    handleKeyChange = (e) => {
      const value =  e.target.value;
      if(value.length > 0){
        this.searchSpotify(value, "album,artist,track");
      }

      this.setState({query: value});
      this.searchSpotify("", "album,artist,track");
    }

    handleKeyDown = (e) => {
      const { cursor, matches } = this.state
      if (e.keyCode === 38 && cursor > 0) {
        this.setState(prevState => ({
          cursor: prevState.cursor - 1
        }))
      } else if (e.keyCode === 40 && cursor < matches.length - 1) {
        this.setState(prevState => ({
          cursor: prevState.cursor + 1
        }))
      }
    }

    renderSuggestions = () => {
      const {matches, cursor} = this.state;

      if(matches.length === 0) { return; }
      return (
       <Autosuggest matches={matches} cursor={cursor} />
      )
    }

    render() {
        const {query} = this.state;
        return (
          <section className="search-container">
            <div id="searchbox" className="searchbox" role="searchbox">
              <form id="search-form">
                <input
                  type="search"
                  value={query}
                  placeholder="Seach artists, songs, or lyrics"
                  onChange={this.handleKeyChange}
                  onKeyDown={this.handleKeyDown} />
              </form>
            </div>
            {this.renderSuggestions()}
          </section>
        );
    }
};