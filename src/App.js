import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { Home, About, Music, Settings } from './views';
>>>>>>> css

export default class App extends React.Component {
  render() {
    return(
      <>
      </>
    );
  }
};
=======

import Greeting from './components/Greeting';

function App() {
  return (<Greeting/>);
}

export default App;
>>>>>>> greeting-component
