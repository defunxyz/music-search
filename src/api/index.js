/**
 * An Application Programming Interface (API) Facilitator
 *
 * @file api/index.js
 * @author Fisnik
 * @copyright 2020 Fisnik
 */

 /* 
   Todo:
     - Finish Search API functions
 */

import axios from 'axios';
var querystring = require('querystring');

// API Keys
const NAPSTER_API_KEY = 'MDA1YWVlOTAtYTgxYy00YzhlLTg0ZDAtYWNiM2ZmNWRjMGFm';
const NAPSTER_API_KEY_SECRET = 'YTg1YTQ0MWYtZjQ5Mi00NjAzLWEwOWUtN2UyYjI3YjE2NzNk';

const SPOTIFY_CLIENT_ID = 'c22cebab4f14406b9d20ce55d8059b26';
const SPOTIFY_CLIENT_SECRET = 'a7f683d12dae40f5a8a6a162cc408bbe';

// Endpoints ?client_id=${APIKEY}&response_type=code
const Napster_Auth_Endpoint = `https://api.napster.com/oauth/access_token`;

const Spotify_Auth_Endpoint = `https://accounts.spotify.com/api/token`;
const Spotify_Search_Endpoint = `https://api.spotify.com/v1/search?`;
const Spotify_Artists_Albums_Endpoint = (id) => `https://api.spotify.com/v1/artists/${id}/albums`;
const Napster_Search_Endpoint = (key, term) => `http://api.napster.com/v2.2/search/verbose?apikey=${key}&query=${term}`;

// Tokens
let spotify_token = {};
//let napster_token = {};

// This function below is NOT finished yet.
export const authNapsterAPI = async () => {
    axios({
        url: Napster_Auth_Endpoint,
        method: 'post',
        params: {
            client_id: NAPSTER_API_KEY,
            client_secret: NAPSTER_API_KEY_SECRET
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
          'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        data: querystring.stringify({ grant_type: 'client_credentials'}),
        auth: {
          username: SPOTIFY_CLIENT_ID,
          password: SPOTIFY_CLIENT_SECRET
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
    axios.get(Napster_Search_Endpoint(NAPSTER_API_KEY, term));
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
export const searchSpotifyAPI = async (term, type, offset=0, limit=1) => {
    term = encodeURIComponent(term);
    return axios({
        url: Spotify_Search_Endpoint,
        method: 'get',
        params: {
            q: term,
            type: type,
            offset: offset,
            limit: limit
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
 * A function that returns Spotify Token information in current session.
 * 
 * @returns {Object} Spotify Token Data
 */
export const getSpotifyToken = () => { return spotify_token; };