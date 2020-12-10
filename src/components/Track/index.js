/**
 * @file components/Track.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import "./index.css";

const Track = (props) => {
    const { data, result } = props;
    console.log(data);
    let lyrics = "";
    if(result.result !== undefined) {
        // eslint-disable-next-line
        lyrics = result.result.track.text.replace(new RegExp('\r?\n','g'), '<br />');
    } else {
        lyrics = "No lyrics data found.";
    }

    function msToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
      

    return(
        <div className="album">
        <h1>{data.name}</h1>

        <div className="clearfix">
            <div className="track-info lfloat">
                <span id="artist" className="artist">{data.artists[0].name}</span>
                <span id="track_number">Track number {data.track_number}</span>
                <span id="duration">Duration {msToMinAndSec(data.duration_ms)}</span>
            </div>
            <div className="track-stat rfloat">
            <div className="stat">
                <span className="number">{data.popularity}</span>
                <span className="infom">Popularity</span>
            </div>
        </div>
        </div>
        
        {result.result !== undefined &&
        <div className="lyrics">
             <Scrollbars style={{ height: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
            </Scrollbars>
        </div>}
        {result.result === undefined &&
              <div className="notice no-data">
              {lyrics}
              </div>
            }
        </div>
    );
};

export default Track;