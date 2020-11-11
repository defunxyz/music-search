import React from "react";

export default ({ matches }) => {
    return (
        <div id="autosuggest" className="autosuggest">
            <ul>
                {
                    matches.albums.items.map((item) =>
                        <li>
                            <div className="autocomplete-item" role="option" aria-selected="false">
                                {items.images === undefined && ""}
                                {item.images[2] === undefined ? "" : <img className="image" src={item.images[2].url} alt="" />}
                                <div className="label">{item.name}</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
};