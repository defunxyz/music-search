import React, { useEffect } from "react";
import HistoryItem from "../Data/HistoryItem";

export default (props) => {
    const {data} = props;
    if(data === undefined || data.length === 0) {
        return(<div className="no-history">
            <h3>
                No history this time!
            </h3>
            <span>
                You haven't search and viewed any artist, song, album, or tracks.
                Go ahead and try searching for a favorite or something.
            </span>
        </div>);
    }

    useEffect(() => {
        var history = document.getElementById("history");
        history.scrollTop = history.scrollHeight;
    });

    return(
        <div id="history" className="history">
            <ul>
                {data.map((item) =>
                    <li id={item.id} key={item.id} data-type={item.type}>
                        <HistoryItem data={item} dataRenderHandler={props.dataRenderHandler} />
                    </li>)}
            </ul>
        </div>
    );
};