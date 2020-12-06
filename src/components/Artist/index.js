import React from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import "./index.css";
import convertNumber from "../../utility";
import {capitalize} from "../../utility";

const Artist = ({data, text}) => {
    return(
        <>
        <div className="artist-photo">
            <img src={data.images[1].url} alt="" />
            <h1>{data.name}</h1>
        </div>
        <div className="genres">
            <ul>
                {data.genres.slice(0, 5).map((genre) => {
                    return <li>{capitalize(genre)}</li>
                })}
            </ul>
        </div>
        <div className="artist-stats">
            <div className="stat">
                <span className="number">{data.popularity}</span>
                <span className="infom">Popularity</span>
            </div>
            <div className="stat">
                <span className="number">{convertNumber(data.followers.total)}</span>
                <span className="infom">Followers</span>
            </div>
        </div>
        {text.extract && 
        <div className="artist-bio">
            <Scrollbars style={{ height: 200 }}>
                <div dangerouslySetInnerHTML={{ __html: text.extract }}></div>
            </Scrollbars>
        </div>}
        {text.extract === undefined &&
        <div className="notice">
            No artist bios was found for this artist.
        </div>}
        </>
    );
};

export default Artist;