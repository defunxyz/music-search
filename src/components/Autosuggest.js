import React from "react";

export default (props) => {
    return (
        <div id="autosuggest" className="autosuggest">
            <ul>
                props.matches.map((item) => {
                    <li>
                        <div className="autocomplete-item" role="option" aria-selected="false">
                            <div className="label">{item}</div>
                        </div>
                    </li>
                })
            </ul>
        </div>
    )
};