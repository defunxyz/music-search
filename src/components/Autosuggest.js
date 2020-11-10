import React from "react";

export default (props) => {
    return (
        <div id="autosuggest" className="autosuggest">
            <ul>
                <li>
                    <div className="autocomplete-item" role="option" aria-selected="false">
                        <div className="label">{props.query}</div>
                    </div>
                </li>
            </ul>
        </div>
    )
};