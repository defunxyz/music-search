import React from "react";
import styled from "styled-components";
import { easings } from 'react-animation'

const Notification = styled.div`
    margin-bottom: 0;
	padding: 12px 0;
	font-size: 16px;
	color: #000;
	fill: #000;
    margin-top: 0px;
    position: absolute;
    bottom: 48px;
    width: 100%;
`;

const LightOrangeAlert = styled(Notification)`
    background-color: #FFC864;
`;

const Message = styled.span`
    margin-left: 10px;
`;

const CloseSvg = styled.svg`
    height: 15px;
    width: 15px;
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
`;

const Action = styled.a`
    text-decoration: none;
    position: absolute;
    right: 0;
    top: 0;
`;

export default class Alert extends React.Component {
    constructor(props){
        super(props);
        this.state = { message: this.props.message };
    }

    render() {
        return (
            <LightOrangeAlert>
                <Message>{this.state.message}</Message>
                <Action className="rfloat" title="Close" onClick={this.props.hideCookieNotification} 
                onMouseDown={this.hide}>
                    <CloseSvg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="15px" height="15px" viewBox="0 0 348.333 348.334">
                        <g>
                            <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
            c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
            c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
            l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
            L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
                        </g>
                    </CloseSvg>
                </Action>
            </LightOrangeAlert>
        );
    }
}