import React, { useEffect, useState } from "react";

const HistoryButton = (props) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(props.data.length);
    });

    return (
        <div class="floating-circle-btn" onClick={() => {props.showHistoryPopOver()}}>
            <svg class="time-icon" height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h48v48h-48z" fill="none"></path>
                <path d="M25.99 6c-9.95 0-17.99 8.06-17.99 18h-6l7.79 7.79.14.29 8.07-8.08h-6c0-7.73 6.27-14 14-14s14 6.27 14 14-6.27 14-14 14c-3.87 0-7.36-1.58-9.89-4.11l-2.83 2.83c3.25 3.26 7.74 5.28 12.71 5.28 9.95 0 18.01-8.06 18.01-18s-8.06-18-18.01-18zm-1.99 10v10l8.56 5.08 1.44-2.43-7-4.15v-8.5h-3z" opacity=".9"></path>
            </svg>
            <div class="total-items">
                <span class="number">{count}</span>
            </div>
        </div>
    );
};

export default HistoryButton;