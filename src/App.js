import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Greeting from "./components/Greeting";
import Alert from "./components/Alert";
import Search from "./components/Search";
import PoweredBy from "./components/PoweredBy";
import Copyright from "./components/Copyright";
import StatisticsContainer from './components/StatisticsContainer';
import GetNameDialog from './views/dialogs/GetNameDialog';
import AboutDialog from './views/dialogs/AboutDialog';
import KeyboardDialog from './views/dialogs/KeyboardDialog';

import {getSpotifyToken, authSpotifyAPI} from "./api";
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

const App = () => {
  const [state, setState] = useState({
    data: {},
    wiki: {},
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
  });
  const [storage_data, setStorageData] = useState({
    username: "",
    history: []
  });
  const [notification, setNotification] = useState(false);
  const [spotify_token, setToken] = useState({});
  const [dialog, setActive] = useState({
    getStartedDialog: false,
    helpDialog: false,
    artistDialog: false,
    albumDialog: false,
    trackDialog: false,
    aboutDialog: false
  });
  const [history, showHistory] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);

    const fetchSpotifyToken = async () => {
      const token = await authSpotifyAPI();
      if(token){
        setToken(getSpotifyToken());
      }
    }

    if(spotify_token === undefined || spotify_token === {}){
      fetchSpotifyToken();
    }

    const data = loadData();
    if(data !== undefined){
      setNotification(false);
      setStorageData(data);
    } else {
      setNotification(true);
    }
  }, []);

  const handleKeyDown = (e) => {
    if(e.shiftKey && e.key === '?') {
      e.preventDefault();
      setActive({...dialog, helpDialog: true});
    }
  }

  const refresh = () => {
    const data = loadData();
    if(data){
      setStorageData(data);
    }
  }

  const dataRenderHandler = (data, extra, update = false) => {
    // eslint-disable-next-line
    setActive(false);
    if(update) { refresh(); }
    switch(data.type) {
      case 'artist':
          setState({...state, data: data, wiki: extra });
          setActive({...dialog, artistDialog: true});
          break;
      case 'album':
          setState({...state, data: data, lyrics: extra });
          setActive({...dialog, albumDialog: true});
          break;
      case 'track':
          setState({...state, data: data, lyrics: extra });
          setActive({...dialog, trackDialog: true});
          break;
      default: break;
    }
  }

  return (
    <>
    <header className="clearfix">
      <AppText className="lfloat">
        Instantly Search artists, songs,<br />anytime, anywhere.
      </AppText>
      {storage_data.username && <Greeting name={storage_data.username} />}
    </header>
    <main>
      <Search dataRenderHandler={dataRenderHandler} />
      <StatisticsContainer data={state.stats} />
      <PoweredBy />
      { !notification && 
        <Copyright toggleShowAbout={() => setActive({...dialog, aboutDialog: true})} style={{ opacity: 0.5, marginTop: 30 }} /> 
      }
    </main>
    { history && <HistoryPopOver show={history} data={storage_data.history} dataRenderHandler={dataRenderHandler} refresh={refresh} /> }
    { !notification && <HistoryButton showHistoryPopOver={() => showHistory(!history)} data={storage_data.history} /> }
    { notification && <Alert message="We use localstorage to ensure that we give you the best experience on our website."
      hideCookieNotification={() => { setActive({...dialog, getStartedDialog: true}); setNotification(false); }} /> }
    { notification &&
      <footer> <Copyright toggleShowAbout={() => setActive({...dialog, aboutDialog: true})} /> </footer> }
    <div id="dialogs">
        {dialog.getStartedDialog && <GetNameDialog updateState={() => 
          {refresh(); setActive({...dialog, getStartedDialog: false})}} 
          show={dialog.getStartedDialog ? true : false} 
        hasShadowOverlay={true} /> }
        
        {dialog.aboutDialog && <AboutDialog refresh={() => setActive({...dialog, aboutDialog: !dialog.aboutDialog})} 
        show={dialog.aboutDialog} hasShadowOverlay={true} /> }
        
        {dialog.helpDialog && <KeyboardDialog reset={() => setActive({...dialog, helpDialog: !dialog.helpDialog})} 
        show={dialog.helpDialog} hasShadowOverlay={true} /> }
        
        {dialog.artistDialog && <ArtistDialog data={state.data} 
        text={state.wiki} refresh={() => setActive({...dialog, artistDialog: !dialog.artistDialog})} 
        show={dialog.artistDialog} hasShadowOverlay={true} /> }

        {dialog.albumDialog && <AlbumDialog data={this.state.data} lyrics={this.state.lyrics}
        refresh={() => setActive({...dialog, albumDialog: !dialog.albumDialog})} 
        show={dialog.albumDialog} hasShadowOverlay={true} />}

        {dialog.trackDialog && <TrackDialog data={state.data} lyrics={state.lyrics}
        refresh={() => setActive({...dialog, trackDialog: !dialog.trackDialog})} 
        show={dialog.trackDialog} hasShadowOverlay={true} />}
    </div>
  </>
  );
};

export default App;
