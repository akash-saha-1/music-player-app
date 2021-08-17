import React, { useState, useEffect, useCallback } from 'react';
import { useHttpClient } from '../../Hooks/HttpHook';
import ErrorModal from '../../Shared/Modal/ErrorModal/ErrorModal';
import Loader from '../../Shared/Loader/Loader';
import './search.scss';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';

const Search = (props) => {
  const songsLimit = parseInt(process.env.REACT_APP_RAPID_API_SONGS_PAGE_LIMIT);
  const [songsList, setSongsList] = useState([]);
  const [searchText, setSearchText] = useState();
  const [musicPlayer, showMusicPlayer] = useState(false);
  const [song, setSong] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    setSearchText(query);
    props.setTabName('search');

    if (searchText || query) {
      props.setTabName('search');
      setTimeout(() => {
        document.getElementById('search-bar').value = query;
      }, 100);
      const searchSongs = async () => {
        let response;
        try {
          response = await sendRequest(
            `/search?term=${query.trim()}&offset=0&limit=${songsLimit}`
          );
          if (response) setSongsList(response.tracks.hits);
        } catch (err) {
          console.error(err);
        }
      };
      searchSongs();
    }
    // eslint-disable-next-line
  }, []);

  const playSong = useCallback((song) => {
    setSong(song);
    showMusicPlayer(true);
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <ErrorModal error={error} onClear={clearError} header="Loading" />
      {musicPlayer && <MusicPlayer song={song} />}

      {!searchText || !songsList ? (
        <div className="no-result">
          Sorry! No Result found. Please search again
        </div>
      ) : null}
      {searchText && songsList && (
        <div className="search-container">
          <h3 className="title">Search Results</h3>
          <div className="cards col-12 row">
            {songsList.map((song) => (
              <div className="card col-md-4" key={Math.random()}>
                <div className="card-wrapper">
                  <img
                    className="card-img-top"
                    src={song.track.images.coverart}
                    alt="song-cover"
                  />
                  <div className="card-body">
                    <h4>{song.track.title}</h4>
                    <h6>{song.track.subtitle}</h6>
                    <button
                      className="btn btn btn-dark play-song horizontal-middle-align"
                      onClick={() => {
                        playSong(song.track);
                      }}
                    >
                      Play Music
                      <i className="fas fa-music" />
                    </button>
                    <button className="btn more-info horizontal-middle-align">
                      <a href={song.track.url}>More Information</a>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Search;
