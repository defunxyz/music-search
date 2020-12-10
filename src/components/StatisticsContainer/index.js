/**
 * Helper container.
 * 
 * @file components/StatisticsContainer.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React, {useEffect, useState} from "react";

export default (props) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <div className="statistics-container">
            <div className="statistics-data">
                {data.map((o) => (
                    <div className="stats">
                        <h3>{o.total}</h3>
                        <h4>{o.label}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}