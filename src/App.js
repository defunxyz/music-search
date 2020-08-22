import React from 'react';
import { authSpotifyAPI, authNapsterAPI, getSpotifyToken } from './api';
import './App.css';

class App extends React.Component {
  constructor(prop){
    super(prop);
    this.state = {
      spotify_token: {},
      error: false, 
      errorMessage: ""
    };
  }

  componentDidMount(){
    if (Object.keys(this.state.spotify_token).length === 0) {
      this.authSpotify();
      this.authNapster();
    }
  }

  authNapster = async () => {
    authNapsterAPI();
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
      console.log(this.state.spotify_token);
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
