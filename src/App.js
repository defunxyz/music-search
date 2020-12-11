import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { loadData } from "./storage";
import { getSpotifyToken, authSpotifyAPI } from "./api";
import { HistoryButton, HistoryPopOver } from "./components/History";
import { Alert, Search, PoweredBy, Copyright, StatisticsContainer, Greeting } from "./components";
import { GetNameDialog, AboutDialog, KeyboardDialog, ArtistDialog, AlbumDialog, TrackDialog } from "./views/dialogs";

var stats = require("./stats.json");
var about = require("./about.json");

const AppText = styled.h1`
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #af2896, #509bf5);
  padding: 1rem;
  font-size: 1.1rem;
  text-rendering: geometricPrecision;

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

const App = () => {
  const [state, setState] = useState({
    data: {},
    wiki: {},
    lyrics: {}
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
    // eslint-disable-next-line
    document.addEventListener("keydown", handleKeyDown, false);

    console.log(about);

    const fetchSpotifyToken = async () => {
      const token = await authSpotifyAPI();
      if(token){
        setToken(getSpotifyToken());
      }
    }

    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
        Instantly Search artists, albums, and songs<br />anytime, anywhere.
      </AppText>
      {storage_data.username && <Greeting name={storage_data.username} />}
    </header>
    <main>
      <Search dataRenderHandler={dataRenderHandler} disabled={notification ? true : false} />
      <StatisticsContainer data={stats} />
      <PoweredBy />
      { !notification && <Copyright toggleShowAbout={() => setActive({...dialog, aboutDialog: true})} style={{ opacity: 0.5, marginTop: 30 }} /> }
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
        show={dialog.aboutDialog} hasShadowOverlay={true} appinfo={about} scrollable={false} /> }
        
        {dialog.helpDialog && <KeyboardDialog reset={() => setActive({...dialog, helpDialog: !dialog.helpDialog})} 
        show={dialog.helpDialog} hasShadowOverlay={true} /> }
        
        {dialog.artistDialog && <ArtistDialog data={state.data} 
        text={state.wiki} refresh={() => setActive({...dialog, artistDialog: !dialog.artistDialog})} 
        show={dialog.artistDialog} hasShadowOverlay={true} scrollable={true} /> }

        {dialog.albumDialog && <AlbumDialog data={state.data} lyrics={state.lyrics}
        refresh={() => setActive({...dialog, albumDialog: !dialog.albumDialog})} 
        show={dialog.albumDialog} hasShadowOverlay={true} scrollable={true} />}

        {dialog.trackDialog && <TrackDialog data={state.data} lyrics={state.lyrics}
        refresh={() => setActive({...dialog, trackDialog: !dialog.trackDialog})} 
        show={dialog.trackDialog} hasShadowOverlay={true} />}
    </div>
  </>
  );
};

export default App;
