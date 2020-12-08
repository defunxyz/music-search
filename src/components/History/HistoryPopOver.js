import React from "react";
import PropTypes from "prop-types";
import "./history.css";
import HistoryList from "./HistoryList";

class HistoryPopOver extends React.Component {
    constructor(props){
        super(props);
        this.state = { visible: this.props.show }
        this.toggleVisible = this.toggleVisible.bind(this);
    }

    toggleVisible = () => {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        if(!this.state.visible) {
            return "";
        }

        return (
            <div className="popout">
                <div className="popout-bar clearfix">
                    <h2 className="lfloat">History</h2>
                    <svg onClick={this.toggleVisible} className="close rfloat" height="30px" width="30px" viewBox="0 0 24 24">
                        <line stroke="#bec2c9" strokeLinecap="round" strokeWidth="2" x1="6" x2="18" y1="6" y2="18"></line>
                        <line stroke="#bec2c9" strokeLinecap="round" strokeWidth="2" x1="6" x2="18" y1="18" y2="6"></line>
                    </svg>
                </div>
                <div className="popout-body">
                    <HistoryList data={this.props.data} dataRenderHandler={this.props.dataRenderHandler}/>
                </div>
                <div className="popout-footer"></div>
            </div>
        );
    }
}

HistoryPopOver.propsTypes = {
    show: PropTypes.bool.isRequired,
    toggleVisible: PropTypes.func.isRequired
}

export default HistoryPopOver;