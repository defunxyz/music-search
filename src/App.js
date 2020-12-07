import React from "react";
import styled from "styled-components";
import Greeting from "./components/Greeting";
import Search from "./components/Search";
import PoweredBy from "./components/PoweredBy";
import Copyright from "./components/Copyright";
import Alert from './components/Alert';
import StatisticsContainer from './components/StatisticsContainer';
import GetNameDialog from './views/dialogs/GetNameDialog';
import AboutDialog from './views/dialogs/AboutDialog';
import KeyboardDialog from './views/dialogs/KeyboardDialog';

import {getSpotifyToken, authSpotifyAPI, getAlbumSpotify} from "./api";
import ArtistDialog from "./views/dialogs/ArtistDialog";
import AlbumDialog from "./views/dialogs/AlbumDialog";
import TrackDialog from "./views/dialogs/TrackDialog";

import HistoryButton from "./components/History/HistoryButton";
import HistoryPopOver from "./components/History/HistoryPopOver";

import { loadData } from "./storage";

const AppText = styled.h1`
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #af2896, #509bf5);
  padding: 1rem;
  font-size: 1.1rem;
  text-rendering: geometricPrecision;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookie_notification: true,
      spotify_token: {},
      data: {},
      storage_data: {
        username: "",
        history: []
      },
      lyrics: {},
      stats: [
        {
          total: "100M+",
          label: "Songs"
        },
        {
          total: "10M+",
          label: "Albums"
        },
        {
          total: "20M+",
          label: "Songs"
        },
        {
          total: "30M+",
          label: "Songs"
        }
      ]
    };

    this.hideCookieNotification = this.hideCookieNotification.bind(this);
  }

  componentDidMount = async () => {
    document.addEventListener("keydown", this._handleKeyDown, false);

    const data = loadData();
    this.setState({ storage_data: data });
    if(this.state.cookie_notification === true) {
      if(data) {
        this.setState({ cookie_notification: false });
      }
    }

    const success = await authSpotifyAPI();
    if(success) {
      this.setState({ spotify_token: getSpotifyToken()})
      console.log(this.state.spotify_token);

      const album = await getAlbumSpotify('2Y9IRtehByVkegoD7TcLfi');
      console.log(album);
    }
  }

  _handleKeyDown = (e) => {
    if(e.shiftKey && e.key === '?') {
      e.preventDefault();
      this.setState({ showHelp: true });
    }
  }

  hideCookieNotification = (e) => {
    e.preventDefault();
    this.setState({ cookie_notification: false, showGetName: true });
  }

  checkStorage = () => {
      const data = loadData();
      console.log(data);

      if (data) {
        this.setState({ cookie_notification: false });
      }

      this.setState({ cookie_data: data });
  }

  showAbout = () => {
    this.setState({ showAbout: !this.state.showAbout });
  }

  showHistoryPopOver = () => {
    console.log("Round button clicked!");
    this.setState({ showPopOver: !this.state.showPopOver });
  }

  dataRenderHandler = (data, extra) => {
    // eslint-disable-next-line
    switch(data.type) {
      case 'artist':
          this.setState({ data: data, wiki: extra, showArtist: true });
          break;
      case 'album':
          this.setState({ data: data, lyrics: extra, showAlbum: true });
          break;
      case 'track':
          this.setState({ data: data, lyrics: extra, showTrack: true });
          break;
    }
  }

  render() {

    const { storage_data, cookie_notification, stats, showGetName, showAbout, showHelp, showArtist, showAlbum, showTrack, showPopOver } = this.state;
    let noCookidata = false;
    if(storage_data === undefined) {
      noCookidata = true;
    }

    return (
      <>
        <header className="clearfix">
          <AppText className="lfloat">
            Instantly Search artists, songs,<br />anytime, anywhere.
          </AppText>
        </header>
        <main>
          <Search dataRenderHandler={this.dataRenderHandler} />
          <StatisticsContainer data={stats} />
          <PoweredBy />
          { !cookie_notification && <Copyright toggleShowAbout={this.showAbout} style={{ opacity: 0.5, marginTop: 30 }} /> }
        </main>
        { cookie_notification && <Alert message="We use cookies to ensure that we give you the best experience on our website."
          hideCookieNotification={this.hideCookieNotification} animate={cookie_notification === false ? true : false} />}
        { showPopOver && <HistoryPopOver show={showPopOver} data={storage_data.history} /> }
        { !noCookidata && <HistoryButton showHistoryPopOver={this.showHistoryPopOver} data={storage_data.history} /> }
        { cookie_notification && <footer> <Copyright toggleShowAbout={this.showAbout} /> </footer>}
        <div id="dialogs">
            <GetNameDialog updateState={() => 
              {this.checkStorage(); this.setState({showGetName: !this.state.showGetName});}} 
              show={showGetName ? true : false} 
              hasShadowOverlay={true} /> 
            
            {showAbout && <AboutDialog refresh={() => this.setState({ showAbout: !this.state.showAbout })} 
            show={showAbout} hasShadowOverlay={true} /> }
            
            {showHelp && <KeyboardDialog reset={() => this.setState({ showHelp: !this.state.showHelp })} 
            show={showHelp} hasShadowOverlay={true} /> }
            
            {showArtist && <ArtistDialog data={this.state.data} 
            text={this.state.wiki} refresh={() => this.setState({ showArtist: !this.state.showArtist })} 
            show={showArtist} hasShadowOverlay={true} /> }

            {showAlbum && <AlbumDialog data={this.state.data} lyrics={this.state.lyrics}
            refresh={() => this.setState({ showAlbum: !this.state.showAlbum })} 
            show={showAlbum} hasShadowOverlay={true} />}

            {showTrack && <TrackDialog data={this.state.data} lyrics={this.state.lyrics}
            refresh={() => this.setState({ showTrack: !this.state.showTrack })} 
            show={showTrack} hasShadowOverlay={true} />}
        </div>
      </>
    );
  }
};
