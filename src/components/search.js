import React from 'react';
import { authSpotifyAPI, getSpotifyToken, searchSpotifyAPI } from '../api';
import BlackScrollbars from "./BlackScrollbars";

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "",
            cursor: 0,
            spotify_token: {},
            matches: [],
            error: false,
            errorMessage: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        if (Object.keys(this.state.spotify_token).length === 0) {
          this.authSpotify();
        }
    }

    authSpotify = async () => {
        let success = false;
        try{
          success = await authSpotifyAPI();
        } catch(e) {
          if(!this.state.error) {
            this.setState({
              error: true, 
              errorMessage: e.message
            });
          }
        }
    
        if(success) {
          this.setState({
            spotify_token: getSpotifyToken()
          });
        }
    }

    searchSpotify = async (term, type) => {
        let response;

        if(term.length > 0)
        {
          try{
            response = await searchSpotifyAPI(term, type);
          } catch(e) {
            console.log(e.message);
          }
      
          if(response.success) {
            const merge = [];

            response.data.artists.items.forEach(artist => {
              merge.push(artist);
            });
            
            response.data.albums.items.forEach(album => {
              merge.push(album);
            });

            response.data.tracks.items.forEach(track => {
              merge.push(track);
            });

            this.setState({ matches: merge });

          }
        }
        else {
          this.setState({ matches: [] });
        }
    }

    handleChange = async (e) => {
      if(e.target.value.length === 0){
        await this.setState({ query: "" });
        this.setState({ matches: [] });
      }
      else {
        await this.setState({ query: e.target.value });
        let prepared = this.state.query.trim().replace(/(?<=\w)\s+(?=\w)|(\s+)/gi, "+");
        console.log(prepared);
        this.searchSpotify(prepared, "artist,album,track");
      }
    }

    // handleKeyDown = (e) => {
    //   const { cursor, matches } = this.state
    //   if (e.keyCode === 38 && cursor > 0) {
    //     this.setState(prevState => ({
    //       cursor: prevState.cursor - 1
    //     }))
    //   } else if (e.keyCode === 40 && cursor < matches.length - 1) {
    //     this.setState(prevState => ({
    //       cursor: prevState.cursor + 1
    //     }))
    //   }
    // }

    renderSuggestions = () => {
      const {matches, query} = this.state;
      if(matches.length === 0) { return; }

      const regex = new RegExp(query, 'gi');
      const filtered = matches.filter(match => regex.test(match.name));

      return (
        <div id="autosuggest" className="autosuggest">
          <ul>
              <BlackScrollbars autoHeight autoHeightMax={400}>
                {
                  filtered.map((item) =>
                    <li>
                      <div className="autocomplete-item" role="option" aria-selected="false">
                        {item.images === undefined ? "" : item.images[0] === undefined ? "" :
                          <div className="image-ancor"><img className="image" src={item.images[0].url} alt="" /></div>}
                        <div className="label">{item.name}</div>

                        {item.type === "album" && <span className="type">
                          {item.album_type.slice(0, 1).toUpperCase() + item.album_type.slice(1, item.album_type.length) +
                            " by " + item.artists[0].name}</span>}

                        {item.type === "artist" && <span className="type">{
                          item.type.slice(0, 1).toUpperCase() + item.type.slice(1, item.type.length)}</span>}

                        {item.type === "track" && <span className="type">{
                          item.type.slice(0, 1).toUpperCase() + item.type.slice(1, item.type.length)}</span>}
                      </div>
                    </li>
                  )
                }
              </BlackScrollbars>
          </ul>
        </div>
      )
    }

    render() {
        return (
          <section className="search-container">
            <div id="searchbox" className="searchbox" role="searchbox">
              <form id="search-form">
                <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                  <path d="M0,0h24v24H0V0z" fill="none"></path>
                </svg>
                <input
                  type="search"
                  value={this.state.query}
                  placeholder="Seach artists, songs, or lyrics"
                  onChange={e => this.handleChange(e)} />
              </form>
            </div>
            {this.renderSuggestions()}
          </section>
        );
    }
};