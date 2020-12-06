import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
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
            <Scrollbars style={{ height: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
            </Scrollbars>
        </div>
        </div>
    );
};

export default Track;