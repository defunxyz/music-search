import React from "react";
import BlackScrollbars from "./BlackScrollbars";

export default ({ matches, query }) => {
    
    const regex = new RegExp(query, 'gi');
    const filtered = matches.filter(match => regex.test(match.name));
    
    return (
        <div id="autosuggest" className="autosuggest">
            <ul>
                <BlackScrollbars autoHeight autoHeightMax={400} style={{
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8
                }}>
                    {
                        filtered.map((item) =>
                            <li id={item.id} key={item.id}>
                                <div className="autocomplete-item" role="option" aria-selected="false">
                                    {item.images === undefined ? "" : item.images[0] === undefined ? "" :
                                        <div className="image-ancor"><img className="image" src={item.images[0].url} alt="" /></div>}
                                    <div className="label">{item.name}</div>

                                    {item.type === "album" && <span className="type">
                                        {item.album_type.slice(0, 1).toUpperCase() + item.album_type.slice(1, item.album_type.length) +
                                            " by " + item.artists[0].name}</span>}

                                    {item.type === "artist" && <span className="type">{
                                        item.type.slice(0, 1).toUpperCase() + item.type.slice(1, item.type.length)}</span>}

                                    {item.type === "track" && <span className="type">{
                                        item.type.slice(0, 1).toUpperCase() + item.type.slice(1, item.type.length)}</span>}
                                </div>
                            </li>
                        )
                    }
                </BlackScrollbars>
            </ul>
        </div>
    )
};