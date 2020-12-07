import React from "react";

export default (props) => {
    const {data} = props;
    if(data === undefined) {
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

    return(
        <ul>
        {data.map((item) => 
        <li id={item.id} key={item.id}>
        </li>)}
        </ul>
    );
};