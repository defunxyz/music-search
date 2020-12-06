import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import "./index.css";

const Album = (props) => {
    const { data, result } = props;
    let lyrics = "";
    if(result !== undefined) {
        // eslint-disable-next-line
        lyrics = result.result.track.text.replace(new RegExp('\r?\n','g'), '<br />');
    }
    
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
        {result !== undefined && <div className="lyrics">
            <Scrollbars style={{ height: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
            </Scrollbars>
        </div>}
        </div>
    );
};

export default Album;