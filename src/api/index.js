/**
 * An Application Programming Interface (API) Facilitator
 *
 * @file api/index.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */
import axios from 'axios';
var querystring = require('querystring');

// Endpoints ?client_id=${APIKEY}&response_type=code
const Napster_Auth_Endpoint = `https://api.napster.com/oauth/access_token`;
const Napster_Search_Endpoint = (key, term) => `http://api.napster.com/v2.2/search/verbose?apikey=${key}&query=${term}`;

const Spotify_Auth_Endpoint = `https://accounts.spotify.com/api/token`;
const Spotify_Search_Endpoint = `https://api.spotify.com/v1/search?`;
const Spotify_Artists_Albums_Endpoint = (id) => `https://api.spotify.com/v1/artists/${id}/albums`;
const Spotify_Artist_Endpoint = (id) => `https://api.spotify.com/v1/artists/${id}`;
const Spotify_Track_Endpoint = (id) => `https://api.spotify.com/v1/tracks/${id}`;
const Spotify_Album_Endpoint = (id) => `https://api.spotify.com/v1/albums/${id}`;

const Wikipedia_Extract_Endpoint = (title, format) => 
`https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=${format}&exintro=&titles=${title}`;

const APISEEDS_Lyrics_Endpoint = (artist, songName) => 
`https://orion.apiseeds.com/api/music/lyric/${artist}/${songName}?apikey=${process.env.REACT_APP_APISEED_API_KEY}`;

// Tokens
let spotify_token = {};
//let napster_token = {};

// This function below is NOT finished yet.
export const authNapsterAPI = async () => {
    axios({
        url: Napster_Auth_Endpoint,
        method: 'post',
        params: {
            client_id: process.env.REACT_APP_NAPSTER_API_KEY,
            client_secret: process.env.REACT_APP_NAPSTER_API_KEY_SECRET
        },
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': 'Bearer ' + (new Buffer(NAPSTER_API_KEY + ':' + NAPSTER_API_KEY_SECRET).toString('base64'))
        }
    }).then(function(response) {
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });
};

/**
 * Asynchronous function that retrieves a Spotify Token for current session.
 *
 * @returns {Boolean} Returns true if the request was successful, else false along with error message
 */
export const authSpotifyAPI = async () => {
    return axios({
        url: Spotify_Auth_Endpoint,
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (Buffer.from(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ':' + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        data: querystring.stringify({ grant_type: 'client_credentials'}),
        auth: {
          username: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
          password: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
        }
    }).then(function(response) {
        spotify_token = response.data;
        return true;
    }).catch(function(error) {
        return {status: false, error: error};
    });
};

export const searchNapsterAPI = async (term) => {
    term = encodeURIComponent(term);
    axios.get(Napster_Search_Endpoint(process.env.REACT_APP_NAPSTER_API_KEY, term));
};

/**
 * Asynchronous function that retrieves Spotify Catalog information about albums, artists, 
 * playlists, tracks, shows or episodes that match a keyword string.
 * 
 * @param {*} term 
 * @param {*} type 
 * @param {*} offset 
 * @param {*} limit
 */
export const searchSpotifyAPI = async (term, type) => {
    return axios({
        url: Spotify_Search_Endpoint,
        method: 'get',
        params: {
            q: term,
            type: type,
            offset: 0,
            limit: 8
        },
        headers: {
            'Accept':'application/json',
            'Authorization': 'Bearer ' + spotify_token.access_token
        }
    }).then(function(response) {
        return {success: true, data: response.data};
    }).catch(function(error) {
        return {success: false, error: error };
    });
};

//https://api.spotify.com/v1/artists/{id}/albums
export const getArtistAlbumSpotify = (id) => {
    let endpoint = Spotify_Artists_Albums_Endpoint(id);
    axios({
        url: endpoint,
        method: 'get',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Bearer ' + spotify_token.access_token
        }
    }).then(function(response) { console.log(response); }).catch(function(error) { console.log(error); });
};

/**
 * 
 * @param {*} id 
 */
export const getAlbumSpotify = async (id) => {
    return axios({
        url: Spotify_Album_Endpoint(id),
        method: 'get',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Bearer ' + spotify_token.access_token
        }
    }).then(response => {
        return JSON.parse(JSON.stringify(response.data));
    }).catch((error) => {
        return error;
    });
}

/**
 * A function that returns Spotify Token information in current session.
 * 
 * @returns {Object} Spotify Token Data
 */
export const getSpotifyToken = () => { return spotify_token; };

export const getArtistSpotify = async (id) => {
    return axios({
        url: Spotify_Artist_Endpoint(id),
        method: 'get',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Bearer ' + spotify_token.access_token
        }
    }).then(response => {
        let data = JSON.parse(JSON.stringify(response.data));
        return data;
    }).catch(error => {
        return error;
    });
}

export const getTrackSpotify = async (id) => {
    return axios({
        url: Spotify_Track_Endpoint(id),
        method: 'get',
        headers: {
            'Accept':'application/json',
            'Authorization': 'Bearer ' + spotify_token.access_token
        }
    }).then(response => {
        let data = JSON.parse(JSON.stringify(response.data));
        return data;
    }).catch(error => {
        return error;
    });
}

export const fetchExtractFromWikipedia = async (title, format) => {
    let prepared = title.trim().replace(/(?<=\w)\s+(?=\w)|(\s+)/gi, "+");
    return axios.get(Wikipedia_Extract_Endpoint(prepared, format)).then(response => {
      let data = JSON.parse(JSON.stringify(response.data));
      let path = data.query.pages;
      let id = Object.keys(path)[0];
      return {extract: path[id].extract};
    });
};

export const fetchLyrics = async (artist, title) => {
    return axios.get(APISEEDS_Lyrics_Endpoint(artist, title)).then(response => {
        return JSON.parse(JSON.stringify(response.data));
    }).catch(error => {
        return error;
    });
}