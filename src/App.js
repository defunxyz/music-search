import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { Home, About, Music, Settings } from './views';

export default class App extends React.Component {
  render() {
    return(
      <Router>
        <nav>
          <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink exact to="/music">Music</NavLink></li>
            <li><NavLink exact to="/about">About</NavLink></li>
            <li><NavLink exact to="/settings">Settings</NavLink></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Router path="/about">
            <About />
          </Router>
          <Route path="/music">
            <Music />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
};