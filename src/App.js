import React from "react";
import styled from "styled-components";
import Greeting from "./components/Greeting";
import Search from "./components/Search";
import PoweredBy from "./components/PoweredBy";
import Cookies from 'universal-cookie';
import Alert from './components/Alert';

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
      cookie_notification: true
    };
  }

  componentDidMount = () => {
    const cookie = new Cookies();
    // cookie.set('username', 'Fisnik', { path: '/' });

    let username = cookie.get('username');

    if (username) {
      this.setState({ cookie_notification: false });
    }

    this.setState({ name: username });
  }

  hideCookieNotification = (e) => {
    e.preventDefault();
    this.setState({ cookie_notification: false });
  }

  render() {
    const { name, cookie_notification } = this.state;
    return (
      <>
        <header className="clearfix">
          <AppText className="lfloat">
            Instantly Search artists, songs,<br />anytime, anywhere.
          </AppText>
          <Greeting name={name} />
        </header>
        <main>
          <Search />
          <div className="statistics-container">
            <div className="statistics-data">
              <div className="stats">
                <h3>90M+</h3>
                <h4>Songs</h4>
              </div>
              <div className="stats">
                <h3>90M+</h3>
                <h4>Songs</h4>
              </div>
              <div className="stats">
                <h3>90M+</h3>
                <h4>Songs</h4>
              </div>
              <div className="stats">
                <h3>90M+</h3>
                <h4>Songs</h4>
              </div>
            </div>
          </div>
          <PoweredBy />
        </main>
        {cookie_notification && <Alert message="We use cookies to ensure that we give you the best experience on our website."
          hideCookieNotification={this.hideCookieNotification} animate={cookie_notification === false ? true : false} />}
        <footer>
          © 2020, Fisnik. <span role="img" aria-label="Red Heart">Made with ❤️</span>
        </footer>
      </>
    );
  }
};
