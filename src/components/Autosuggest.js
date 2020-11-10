import React from "react";

export default ({ matches, cursor }) => {
    return (
        <div id="autosuggest" className="autosuggest">
            <ul> 
                {
                    matches.map((item, i) =>
                        <li>
                            <div className={cursor == i ? 
                                'autocomplete-item selected':'autocomplete-item'} role="option" aria-selected="false">
                                <div className="label">{item.name}</div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
};