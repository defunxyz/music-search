import React from "react";
import BlackScrollbars from "./BlackScrollbars";
import SearchItem from "./Data/SearchItem";

export default (props) => {
    
    const regex = new RegExp(props.query, 'gi');
    const filtered = props.matches.filter(match => regex.test(match.name));
    
    return (
        <div id="autosuggest" className="autosuggest">
            <ul>
                <BlackScrollbars autoHeight autoHeightMax={400} style={{
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8
                }}>
                    {
                        filtered.map((item) =>
                            <li id={item.id} key={item.id} data-type={item.type}>
                                <SearchItem data={item} />
                            </li>
                        )
                    }
                </BlackScrollbars>
            </ul>
        </div>
    )
};