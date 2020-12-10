import React from "react";
import PropTypes from "prop-types";
import "./history.css";
import HistoryList from "./HistoryList";
import { loadData, saveData } from "../../storage";

class HistoryPopOver extends React.Component {
    constructor(props){
        super(props);
        this.state = {
             visible: this.props.show,
             items: props.data
            }
        this.toggleVisible = this.toggleVisible.bind(this);
    }

    toggleVisible = () => {
        this.setState({ visible: !this.state.visible });
    }

    storeHistory = (items) => {
        let stored = loadData();
        stored.history.splice(0, stored.history.length);
        stored.history = items;
        saveData(stored);
        this.props.refresh();
    }

    _handleDelete = (id) => {
        const updateItems = this.state.items.filter(item => { 
                return item.id !== id
        });
        
        this.setState({ items: [...updateItems]})
        this.storeHistory(updateItems);
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
                    <HistoryList data={this.state.items} dataRenderHandler={this.props.dataRenderHandler} handleDelete={this._handleDelete} />
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