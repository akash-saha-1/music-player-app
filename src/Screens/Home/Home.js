import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../../Shared/Loader/Loader';
import { useHttpClient } from '../../Hooks/HttpHook';
import './home.scss';
import ErrorModal from '../../Shared/Modal/ErrorModal/ErrorModal';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';

const Home = (props) => {
  const [songsList, setSongsList] = useState([]);
  const [musicPlayer, showMusicPlayer] = useState(false);
  const [song, setSong] = useState();
  const [songsLimit, setSongsLimit] = useState(
    parseInt(process.env.REACT_APP_RAPID_API_SONGS_PAGE_LIMIT)
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    setSongsLimit(parseInt(process.env.REACT_APP_RAPID_API_SONGS_PAGE_LIMIT));
    showMusicPlayer(false);

    const loadSongs = async () => {
      let response;
      try {
        response = await sendRequest(
          `/charts/track?startFrom=0&pageSize=${songsLimit}`
        );
        if (response) setSongsList(response.tracks);
      } catch (err) {
        console.error(err);
      }
    };
    loadSongs();
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

      <div className="home-page">
        <h3 className="title">Songs List</h3>
        <div className="cards col-12 row">
          {songsList.map((song) => (
            <div className="card col-md-4" key={song.title}>
              <div className="card-wrapper">
                <img
                  className="card-img-top"
                  src={song.share.image}
                  alt="song-cover"
                />
                <div className="card-body">
                  <h4>{song.title}</h4>
                  {/* <h6>{song.subtitle}</h6> */}
                  <h5>
                    Artists:{' '}
                    {song.artists.map((artist, index) => {
                      if (index === 0) {
                        return artist.alias;
                      } else {
                        return ', ' + artist.alias;
                      }
                    })}
                  </h5>
                  <button
                    className="btn btn btn-dark play-song horizontal-middle-align"
                    onClick={() => {
                      playSong(song);
                    }}
                  >
                    Play Music <i className="fas fa-music" />
                  </button>
                  <button className="btn more-info horizontal-middle-align">
                    <a href={song.url}>More Information</a>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
