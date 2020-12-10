/**
 * @file components/PoweredBy.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React from 'react';
import styled from "styled-components";
import TextLoop from "react-text-loop";

const PoweredBy = styled.div`
    width: 960px;
    color: #fff;
    margin: 20px auto;
    font-weight: 300;
    text-align: center;

    @media (max-width: 480px) {
        width: 100%;
    }

    @media (min-width: 480px) {
        width: 100%;
    }
`;

const PowerdBySpan = styled.span`
    font-weight: 500;
`;

export default () => {
    return (
        <PoweredBy>
            Powered by{" "}
            <TextLoop>
                    <PowerdBySpan> Spotify Web API</PowerdBySpan>
                    <PowerdBySpan> Napster Web API</PowerdBySpan>
                    <PowerdBySpan> APISEEDS</PowerdBySpan>
                    <PowerdBySpan> Wikipedia Web API</PowerdBySpan>
                </TextLoop>
        </PoweredBy>
    );
};