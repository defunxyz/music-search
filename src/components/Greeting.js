/**
 * A greeting component, that based on time of the day
 * greets the user. E.g. 'Good morning, Alexa'.
 *
 * @file components/Greeting.js
 * @author Jerry
 * @copyright 2020 Jerry
 */

import React, { useEffect, useState } from 'react';
import styled from "styled-components";

const Greetings = styled.div`
  color: #fff;
  padding: 1rem;
`
const Text = styled.h3`
  font-weight: 300
`
const Username = styled.span`
font-weight: 500;
`

export default ({name}) => {
  const [message, setMessage] = useState();

  useEffect(() => {
    let t =   new Date().getHours();

    if (t < 12 && t > 4) {
      setMessage("Good morning, ");
    }
    else if (t === 12) {
      setMessage("Noon, ");
    }
    else if (t < 17 && t > 12) {
      setMessage("Good afternoon, ");
    }
    else {
      setMessage("Good evening, ");
    }
  }, []);

  return (
    <>
    {name === "" && 
      <Greetings className="rfloat">
        <Text>{message}<Username>{name}</Username></Text>
      </Greetings>
    }
    </>
  );
}
