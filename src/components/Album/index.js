import React from "react";
import "./index.css";

const Album = (props) => {
    const { data, result } = props;
    // eslint-disable-next-line
    let lyrics = result.result.track.text.replace(new RegExp('\r?\n','g'), '<br />');
    return(
        <div className="album">
        <div className="album-cover">
            <img src={data.images[1].url} alt="" />
        </div>
        <h1>{data.name}</h1>
        <div className="artist-stats">
            <div className="stat">
                <span className="number">{data.popularity}</span>
                <span className="infom">Popularity</span>
            </div>
        </div>
        <div className="album-info">
            
        </div>
        <div className="lyrics">
            <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
        </div>
        </div>
    );
};

export default Album;