import React from "react";
import styled from "styled-components";
import Greeting from "./components/Greeting";
import Search from "./components/Search";
import PoweredBy from "./components/PoweredBy";
import Cookies from 'universal-cookie';
import Alert from './components/Alert';
import StatisticsContainer from './components/StatisticsContainer';
import GetNameDialog from './views/dialogs/GetNameDialog';
import AboutDialog from './views/dialogs/AboutDialog';
import KeyboardDialog from './views/dialogs/KeyboardDialog';

import {getSpotifyToken, authSpotifyAPI} from "./api";

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
    super();
    this.state = {
      name: "",
      cookie_notification: true,
      spotify_token: {},
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
    this.checkCookie();
    const success = await authSpotifyAPI();
    if(success) {
      this.setState({ spotify_token: getSpotifyToken()})
      console.log(this.state.spotify_token);
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

  checkCookie = () => {
    const cookie = new Cookies();
    let username = cookie.get('username');
    console.log(username);

    if (username) {
      this.setState({ cookie_notification: false });
    }

    this.setState({ name: username });
  }

  render() {
    const { name, cookie_notification, stats, showGetName, showAbout, showHelp } = this.state;

    return (
      <>
        <header className="clearfix">
          <AppText className="lfloat">
            Instantly Search artists, songs,<br />anytime, anywhere.
          </AppText>
          {name && <Greeting name={name} />}
        </header>
        <main>
          <Search />
          <StatisticsContainer data={stats} />
          <PoweredBy />
        </main>
        {cookie_notification && <Alert message="We use cookies to ensure that we give you the best experience on our website."
          hideCookieNotification={this.hideCookieNotification} animate={cookie_notification === false ? true : false} />}
        <footer>
          © 2020, Fisnik. <span role="img" aria-label="Red Heart">Made with ❤️</span>
          <div className="about" onClick={() => this.setState({ showAbout: !this.state.showAbout })}>
            <svg className="about-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 23.625 23.625">
              <path d="M11.812,0C5.289,0,0,5.289,0,11.812s5.289,11.813,11.812,11.813s11.813-5.29,11.813-11.813
            S18.335,0,11.812,0z M14.271,18.307c-0.608,0.24-1.092,0.422-1.455,0.548c-0.362,0.126-0.783,0.189-1.262,0.189
            c-0.736,0-1.309-0.18-1.717-0.539s-0.611-0.814-0.611-1.367c0-0.215,0.015-0.435,0.045-0.659c0.031-0.224,0.08-0.476,0.147-0.759
            l0.761-2.688c0.067-0.258,0.125-0.503,0.171-0.731c0.046-0.23,0.068-0.441,0.068-0.633c0-0.342-0.071-0.582-0.212-0.717
            c-0.143-0.135-0.412-0.201-0.813-0.201c-0.196,0-0.398,0.029-0.605,0.09c-0.205,0.063-0.383,0.12-0.529,0.176l0.201-0.828
            c0.498-0.203,0.975-0.377,1.43-0.521c0.455-0.146,0.885-0.218,1.29-0.218c0.731,0,1.295,0.178,1.692,0.53
            c0.395,0.353,0.594,0.812,0.594,1.376c0,0.117-0.014,0.323-0.041,0.617c-0.027,0.295-0.078,0.564-0.152,0.811l-0.757,2.68
            c-0.062,0.215-0.117,0.461-0.167,0.736c-0.049,0.275-0.073,0.485-0.073,0.626c0,0.356,0.079,0.599,0.239,0.728
            c0.158,0.129,0.435,0.194,0.827,0.194c0.185,0,0.392-0.033,0.626-0.097c0.232-0.064,0.4-0.121,0.506-0.17L14.271,18.307z
            M14.137,7.429c-0.353,0.328-0.778,0.492-1.275,0.492c-0.496,0-0.924-0.164-1.28-0.492c-0.354-0.328-0.533-0.727-0.533-1.193
            c0-0.465,0.18-0.865,0.533-1.196c0.356-0.332,0.784-0.497,1.28-0.497c0.497,0,0.923,0.165,1.275,0.497
            c0.353,0.331,0.53,0.731,0.53,1.196C14.667,6.703,14.49,7.101,14.137,7.429z"/>
            </svg>
            <div className="hover-effect"></div>
          </div>
        </footer>
        <div id="dialogs">
            <GetNameDialog updateState={() => 
              {this.checkCookie(); this.setState({showGetName: !this.state.showGetName});}} 
              show={showGetName ? true : false} 
              hasShadowOverlay={true} /> 
            {showAbout && <AboutDialog refresh={() => this.setState({ showAbout: !this.state.showAbout })} 
            show={showAbout} hasShadowOverlay={true} /> }
            {showHelp && <KeyboardDialog reset={() => this.setState({ showHelp: !this.state.showHelp })} 
            show={showHelp} hasShadowOverlay={true} /> }
        </div>
      </>
    );
  }
};
