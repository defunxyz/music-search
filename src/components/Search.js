/**
 * The search interface.
 * 
 * @file components/Search.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React from 'react';
import { authSpotifyAPI, getSpotifyToken, searchSpotifyAPI } from '../api';
import Autosuggest from './Autosuggest';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            cursor: 0,
            spotify_token: {},
            matches: [],
            error: false,
            errorMessage: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    clear = () => {
      this.setState({ query: "", matches: [] });
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

        if(term.length > 0)
        {
          try{
            response = await searchSpotifyAPI(term, type);
          } catch(e) {
            console.log(e.message);
          }
      
          if(response.success) {
            const merge = [];

            /* Merging results */
            response.data.artists.items.forEach(artist => {
              merge.push(artist);
            });
            
            response.data.albums.items.forEach(album => {
              merge.push(album);
            });

            response.data.tracks.items.forEach(track => {
              merge.push(track);
            });

            this.setState({ matches: merge });

          }
        }
        else {
          this.setState({ matches: [] });
        }
    }

    handleChange = async (e) => {
      if(e.target.value.length === 0){
        await this.setState({ query: "" });
        this.setState({ matches: [] });
      }
      else {
        await this.setState({ query: e.target.value });
        let prepared = this.state.query.trim().replace(/(?<=\w)\s+(?=\w)|(\s+)/gi, "+");
        this.searchSpotify(prepared, "artist,album,track");
      }
    }

    render() {
      const {matches, query} = this.state
        return (
          <section className="search-container">
            <div id="searchbox" className="searchbox" role="searchbox">
              <form id="search-form">
                <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                  <path d="M0,0h24v24H0V0z" fill="none"></path>
                </svg>
                <input
                  type="search"
                  value={this.state.query}
                  placeholder="Seach artists, songs, or lyrics"
                  onChange={e => this.handleChange(e)} />
              </form>
            </div>
            <Autosuggest matches={matches} query={query} dataRenderHandler={this.props.dataRenderHandler} clear={this.clear} />
          </section>
        );
    }
};
