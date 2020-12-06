import React from "react";
import "./index.css";

const Track = (props) => {
    const { data, result } = props;
    // eslint-disable-next-line
    let lyrics = result.result.track.text.replace(new RegExp('\r?\n','g'), '<br />');
    return(
        <div className="album">
        <h1>{data.name}</h1>
        <div className="artist-stats">
            <div className="stat">
                <span className="number">{data.popularity}</span>
                <span className="infom">Popularity</span>
            </div>
        </div>
        <div className="lyrics">
            <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
        </div>
        </div>
    );
};

export default Track;