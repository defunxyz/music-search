import React from "react";
import {getArtistSpotify, getAlbumSpotify, getTrackSpotify, 
    fetchExtractFromWikipedia, fetchLyrics} from "../../api";

const HistoryItem = (props) => {
    const {data} = props;

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
                props.dataRenderHandler(artist, extract);
                break;
            case "album":
                let album = await getAlbumSpotify(id);
                if(album.album_type === "single") {
                    lyrics = await fetchLyrics(album.artists[0].name, album.name);
                    props.dataRenderHandler(album, lyrics);
                    break;
                }
                props.dataRenderHandler(album);
                break;
            case "track":
                const track = await getTrackSpotify(id);
                lyrics = await fetchLyrics(track.artists[0].name, track.name); 
                props.dataRenderHandler(track, lyrics);
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
        </div>
    );
};

export default HistoryItem;