import React, { useEffect, useState, useCallback } from 'react';
import './genres.scss';
import Loader from '../../Shared/Loader/Loader';
import { useHttpClient } from '../../Hooks/HttpHook';
import ErrorModal from '../../Shared/Modal/ErrorModal/ErrorModal';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';

const Genres = (props) => {
  const [genres, setGenres] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [musicPlayer, showMusicPlayer] = useState(false);
  const [song, setSong] = useState();
  const songsLimit = parseInt(process.env.REACT_APP_RAPID_API_SONGS_PAGE_LIMIT);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let colorsList = [
    'rgb(26, 188, 156)',
    'rgb(52, 152, 219)',
    'rgb(246, 71, 64)',
    'rgb(231, 76, 60)',
    'rgb(140, 122, 230)',
    'rgb(177, 0, 232)',
    'rgb(0, 127, 95)',
    'rgb(211, 84, 0)',
  ];

  useEffect(() => {
    props.setTabName('genres');
    setGenres([]);
    setSelectedGenre('');
    const loadGenres = async () => {
      let response;
      try {
        response = await sendRequest('/charts/list');
        if (response) setGenres(response.global.genres);
      } catch (err) {
        console.error(err);
      }
    };
    loadGenres();
    // eslint-disable-next-line
  }, []);

  const loadTracks = useCallback(async (name, listId) => {
    setSongsList([]);
    setSelectedGenre(name);
    let response;
    try {
      response = await sendRequest(
        `/charts/track?pageSize=${songsLimit}&startFrom=0&listId=${listId}`
      );
      if (response) setSongsList(response.tracks);
    } catch (err) {
      console.error(err);
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

      <div className="genre-page col-12">
        <div className="col-12 row genres">
          <h2 className="genre-title col-12">Global Genres</h2>
          {genres &&
            genres.map((genre, index) => (
              <div
                key={genre.name + Math.random()}
                className="col-6 col-sm-4 col-md-3 col-xl-2"
              >
                <div
                  className="genre"
                  style={{
                    backgroundColor: colorsList[index % 8],
                  }}
                  onClick={() => loadTracks(genre.name, genre.listid)}
                >
                  {genre.name}
                </div>
              </div>
            ))}
        </div>
        {songsList.length > 0 && (
          <div className="col-12 song-list">
            <h2 className="title">Tracks List of {selectedGenre}</h2>
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
                      <h5>
                        Artists:{' '}
                        {song.artists &&
                          song.artists.map((artist, index) => {
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
                        Play Music
                        <i className="fas fa-music" />
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
        )}
      </div>
    </React.Fragment>
  );
};

export default Genres;
