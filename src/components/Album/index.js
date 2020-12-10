/**
 * @file components/Album.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import dateFormat from 'dateformat';
import "./index.css";

const Album = (props) => {
    const { data, result } = props;
    let lyrics = "";
    let found = true;
    
    if(result !== undefined && result.result !== undefined) {
        // eslint-disable-next-line
        lyrics = result.result.track.text.replace(new RegExp('\r?\n','g'), '<br />');
    } else {
        lyrics = "No lyrics data found."
        found = false;
    }
    
    return(
        <div className="album">
        <div className="album-cover">
            <img src={data.images[1].url} alt="" />
        </div>
        <h1>{data.name}</h1>
        <div className="clearfix">
            <div className="album-info lfloat">
                <span id="artist" className="artist">{data.artists[0].name}</span>
                <span>{dateFormat(data.release_date, "d mmmm yyyy")}</span>
                <span>{data.label}</span>
            </div>
            <div className="album-stat rfloat">
                <div className="stat">
                    <span className="number">{data.popularity}</span>
                    <span className="infom">Popularity</span>
                </div>
            </div>
        </div>
        {found !== false && <div className="lyrics">
            <Scrollbars style={{ height: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
            </Scrollbars>
        </div>}
        {found === false &&
        <div className="notice no-data">
            {lyrics}
        </div>}
        </div>
    );
};

export default Album;