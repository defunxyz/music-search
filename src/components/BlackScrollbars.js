import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class BlackScrollbars extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = { top: 0 };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    handleUpdate(values) {
        const { top } = values;
        this.setState({ top });
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: `rgba(25, 25, 25, 1)`,
            "border-radius": `4px`,
            opacity: 1,
            width: 6
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
                {...this.props}/>
        );
    }
}