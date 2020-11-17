import React from "react";
import styled from "styled-components";
import Greeting from "./components/Greeting";
import Search from "./components/Search";
import PoweredBy from "./components/PoweredBy";
import Cookies from 'universal-cookie';
import Alert from './components/Alert';
import StatisticsContainer from './components/StatisticsContainer';
import GetNameDialog from './views/dialogs/GetNameDialog';

const AppText = styled.h1`
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #af2896, #509bf5);
  padding: 1rem;
  font-size: 1.1rem;
  text-rendering: geometricPrecision;
`

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      cookie_notification: true,
      showDialog: false,
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
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this._handleKeyDown, false);
    this.checkCookie();
  }

  _handleKeyDown = (e) => {
    if(e.shiftKey && e.key === '?') {
      e.preventDefault();
      console.log("Shift + ? was pressed.");
    }
  }

  hideCookieNotification = (e) => {
    e.preventDefault();
    this.setState({ cookie_notification: false });
    this.setState({ showDialog: true });
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
    const { name, cookie_notification, showDialog } = this.state;
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
          <StatisticsContainer data={this.state.stats} />
          <PoweredBy />
        </main>
        {cookie_notification && <Alert message="We use cookies to ensure that we give you the best experience on our website."
          hideCookieNotification={this.hideCookieNotification} animate={cookie_notification === false ? true : false} />}
        <footer>
          © 2020, Fisnik. <span role="img" aria-label="Red Heart">Made with ❤️</span>
        </footer>
        <div id="dialogs">
          {showDialog && 
            <GetNameDialog updateState={this.checkCookie} />}
        </div>
      </>
    );
  }
};
