/**
 * @file components/SearchItem.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

import React from "react";
import {getArtistSpotify, getAlbumSpotify, getTrackSpotify, 
    fetchExtractFromWikipedia, fetchLyrics} from "../../api";
import { loadData, saveData } from "../../storage";

const SearchItem = (props) => {
    const {data} = props;

    const storeHistory = (item) => {
        let stored = loadData();
        stored.history.push(item);
        saveData(stored);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        let type = e.currentTarget.parentNode.getAttribute("data-type");
        let id = e.currentTarget.parentNode.id;
        let lyrics = "";

        // eslint-disable-next-line
        switch(type)
        {
            case "artist":
                const artist = await getArtistSpotify(id);
                const extract = await fetchExtractFromWikipedia(artist.name, 'json');
                storeHistory(artist);
                props.dataRenderHandler(artist, extract, true);
                break;
            case "album":
                let album = await getAlbumSpotify(id);
                storeHistory(album);
                if(album.album_type === "single") {
                    lyrics = await fetchLyrics(album.artists[0].name, album.name);
                    props.dataRenderHandler(album, lyrics, true);
                    break;
                }
                props.dataRenderHandler(album);
                break;
            case "track":
                const track = await getTrackSpotify(id);
                storeHistory(track);
                lyrics = await fetchLyrics(track.artists[0].name, track.name); 
                props.dataRenderHandler(track, lyrics, true);
                break;
        }
        
        props.clear();
    }

    const handleKeyDown = async (e) => {
        if(e.key === 13) {
            e.preventDefault();
            console.log(e.currentTarget.parentNode.id);
            console.log(e.currentTarget.parentNode.attributes.getNamedItem('data-type').value);
        }
    }

    return (
        <div className="autocomplete-item" role="option" aria-selected="false" onClick={handleClick} onKeyDown={handleKeyDown}>
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
        </div>
    );
};

export default SearchItem;