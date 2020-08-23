import React from 'react';
import { authSpotifyAPI, getSpotifyToken, searchSpotifyAPI, getArtistAlbumSpotify } from './api';
import './App.css';

class App extends React.Component {
  constructor(prop){
    super(prop);
    this.state = {
      spotify_token: {},
      artist: {},
      error: false, 
      errorMessage: ""
    };
  }

  componentDidMount(){
    if (Object.keys(this.state.spotify_token).length === 0) {
      this.authSpotify();
    }
  }

  getAlbum = async (id) => {
    console.log(this.state.artist.id);
    getArtistAlbumSpotify(id);
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
        artist: response.data.artists.items[0]
      });
    }

    this.getAlbum(this.state.artist.id);
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
      this.searchSpotify("coldplay", "artist");
    }
  }

  render() {
    return (
      <>
      <h1>API Facilitator</h1>

      <h4>Spotify Auth Token:</h4>
      <p><strong>Token Type: </strong>{this.state.spotify_token.token_type }</p>
      <p><strong>Expires In: </strong> {this.state.spotify_token.expires_in }</p>
      <p><strong>Access Token: </strong>{this.state.spotify_token.access_token }</p>
      </>
    );
  }
};

export default App;
