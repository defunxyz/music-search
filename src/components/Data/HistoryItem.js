import React from "react";
import { fetchExtractFromWikipedia, fetchLyrics } from "../../api";
import { loadData, saveData } from "../../storage";

const HistoryItem = (props) => {
    const {data} = props;

    const getItem = (local, id) => {
        var selected = local.history.filter(item => {
            if(item.id === id) {
                return item;
            }
        });

        return selected[0];
    }

    const handleClick = async (e) => {
        e.preventDefault();
        let type = e.currentTarget.parentNode.getAttribute("data-type");
        let id = e.currentTarget.parentNode.id;
        let lyrics = "";

        let local = loadData();
        let selected = getItem(local, id);
        console.log(selected);

        // eslint-disable-next-line
        switch(type)
        {
            case "artist":
                const extract = await fetchExtractFromWikipedia(selected.name, 'json');
                props.dataRenderHandler(selected, extract);
                break;
            case "album":
                if(selected.album_type === "single") {
                    lyrics = await fetchLyrics(selected.artists[0].name, selected.name);
                    props.dataRenderHandler(selected, lyrics);
                    break;
                }
                props.dataRenderHandler(selected);
                break;
            case "track":
                lyrics = await fetchLyrics(selected.artists[0].name, selected.name); 
                props.dataRenderHandler(selected, lyrics);
                break;
        }
    }

    return (
        <div className="history-item" role="option" aria-selected="false" onClick={handleClick}>
            {data.images === undefined ? "" : data.images[0] === undefined ? "" :
                <div className="image-ancor"><img className="image" src={data.images[0].url} alt="" /></div>}
            <div className="label">{data.name}</div>

            {data.type === "album" && <span className="type">
                {data.album_type.slice(0, 1).toUpperCase() + data.album_type.slice(1, data.album_type.length) +
                    " by " + data.artists[0].name}</span>}

            {data.type === "artist" && <span className="type">{
                data.type.slice(0, 1).toUpperCase() + data.type.slice(1, data.type.length)}</span>}

            {data.type === "track" && <span className="type">{
                data.type.slice(0, 1).toUpperCase() + data.type.slice(1, data.type.length) + " by " + data.artists[0].name}</span>}
            <div className="roundBtn">
                <div className="btn-content btn-delete">
                <svg className="delete rfloat" height="30px" width="30px" viewBox="0 0 24 24">
                    <line stroke="#bec2c9" stroke-linecap="round" strokeWidth="2" x1="6" x2="18" y1="6" y2="18"></line>
                    <line stroke="#bec2c9" stroke-linecap="round" strokeWidth="2" x1="6" x2="18" y1="18" y2="6"></line>
                </svg>
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;