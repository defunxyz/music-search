import React from 'react';
import { authSpotifyAPI } from './api';
import './App.css';

class App extends React.Component {
  
  async componentDidMount() {
    authSpotifyAPI();
  }

  render() {
    return (
      <>
      API Facilitator
      </>
    );
  }
};

export default App;
