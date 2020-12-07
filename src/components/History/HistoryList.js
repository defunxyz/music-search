import React from "react";

export default (props) => {
    const {data} = props;
    return(
        <div id="" className="">
            <ul>
            {data.map((item) => 
            <li id={item.id} key={item.id}>
            </li>)}
            </ul>
        </div>
    );
};

export default HistoryList;