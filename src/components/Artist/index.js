import React from "react";
import "./index.css";

const Artist = ({data, text}) => {
    return(
        <>
        <div className="artist-photo">
            <img src={data.images[1].url} alt="" />
            <h1>{data.name}</h1>
        </div>
        <div className="genres">
            <ul>

            </ul>
        </div>
        <div className="artist-stats">
            <div className="stat">
                <span className="number">{data.popularity}</span>
                <span className="infom">Popularity</span>
            </div>
            <div className="stat">
                <span className="number">{data.followers.total}</span>
                <span className="infom">Followers</span>
            </div>
        </div>
        <div className="artist-bio">
            <div dangerouslySetInnerHTML={{ __html: text.extract }}></div>
        </div>
        </>
    );
};

export default Artist;