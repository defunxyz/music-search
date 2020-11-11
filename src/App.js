import React from "react"
import styled from "styled-components"
import Greeting from "./components/Greeting"
import Search from "./components/Search"
import Cookies from 'universal-cookie'

const AppText = styled.h1`
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(90deg, #af2896, #509bf5);
  padding: 1rem;
  font-size: 1.1rem;
  text-rendering: geometricPrecision;
`

export default class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      name: ""
    }
  }

  componentDidMount = () => {
    const cookie = new Cookies();
    cookie.set('username', 'Fisnik', { path: '/' });
    let username = cookie.get('username');
    this.setState({ name: username });
  }

  render() {
    const {name} = this.state;
    return(
      <>
        <header className="clearfix">
          <AppText className="lfloat">
            Instantly Search artists, songs,<br />anytime, anywhere.
          </AppText>
          <Greeting name={name} />
        </header>
        <main>
            <Search />
        </main>
        <footer>
          © 2020, Fisnik. <span role="img" aria-label="Red Heart">Made with ❤️</span>
        </footer>
      </>
    );
  }
};
