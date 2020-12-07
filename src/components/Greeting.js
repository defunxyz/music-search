/**
 * A greeting component, that based on time of the day
 * greets the user. E.g. 'Good morning, Alexa'.
 *
 * @file components/Greeting.js
 * @author Jerry
 * @copyright 2020 Jerry
 */

import React from 'react';
import styled from "styled-components";

const Greetings = styled.div`
  color: #fff;
  padding: 1rem;
`
const Text = styled.h3`
  font-weight: 300;
  margin: 0 !important;
`
const Username = styled.span`
font-weight: 500;
`

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      message: ""
    };
  }

  componentDidMount = () => {
    setInterval(this.timeOfDay(), 1000);
  }

  timeOfDay = () => {
    let t = new Date().getHours();
    let message = "";

    if (t < 12 && t > 4) {
      message = "Good morning, ";
    }
    else if (t === 12) {
      message = "Noon, ";
    }
    else if (t < 17 && t > 12) {
      message = "Good afternoon, ";
    }
    else {
      message = "Good evening, ";
    }

    this.setState({ message: message })
  }

  render = () => {
    const {name, message} = this.state;
    return (
      <>
      {name && 
        <Greetings className="rfloat">
          <Text>{message}<Username>{name}</Username></Text>
        </Greetings>
      }
      </>
    );
  }
}
