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
const SPOTIFY_CLIENT_ID = 'c22cebab4f14406b9d20ce55d8059b26';
const SPOTIFY_CLIENT_SECRET = 'a7f683d12dae40f5a8a6a162cc408bbe';

// Endpoints
const Spotify_Auth_Endpoint = `https://accounts.spotify.com/api/token`;
const Spotify_Search_Endpoint = (term, type) => `https://api.spotify.com/v1/search?q=${term}&type=${type}`;
const Napster_Search_Endpoint = (key, term) => `http://api.napster.com/v2.2/search/verbose?apikey=${key}&query=${term}`;

// Spotify Token
let spotify_token = {};

export const authSpotifyAPI = () => {
    axios({
        url: Spotify_Auth_Endpoint,
        method: 'post',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        data: querystring.stringify({ grant_type: 'client_credentials' }),
        auth: {
          username: SPOTIFY_CLIENT_ID,
          password: SPOTIFY_CLIENT_SECRET
        }
    }).then(function(response) {
        spotify_token = response.data;
        console.log(spotify_token);
    }).catch(function(error) {
        console.log(error);
    });
};

export const searchSpotifyAPI = (term, type) => {
    term = encodeURIComponent(term);
    axios.get(Spotify_Search_Endpoint(term, type));
};

export const searchNapsterAPI = (term) => {
    term = encodeURIComponent(term);
    axios.get(Napster_Search_Endpoint(NAPSTER_API_KEY, term));
};