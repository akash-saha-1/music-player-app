import React, { useState, useEffect, useCallback } from 'react';
import './artists.scss';
import Loader from '../../Shared/Loader/Loader';
import { useHttpClient } from '../../Hooks/HttpHook';
import ErrorModal from '../../Shared/Modal/ErrorModal/ErrorModal';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';

const Artists = (props) => {
  const [artistList, setArtistList] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState();
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
    props.setTabName('artists');
    setArtistList([]);
    setSelectedArtist();
    const loadArtists = async () => {
      let response;
      try {
        response = await sendRequest(
          `/charts/track?startFrom=0&pageSize=${songsLimit}`
        );
        if (response) setArtistList(response.tracks);
      } catch (err) {
        console.error(err);
      }
    };
    loadArtists();
    // eslint-disable-next-line
  }, []);

  const loadArtistSongs = useCallback(async (artistName, artistId) => {
    setSongsList([]);
    setSelectedArtist(artistName.charAt(0).toUpperCase() + artistName.slice(1));
    let response;
    try {
      response = await sendRequest(
        `/songs/list-artist-top-tracks?id=${artistId}`
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

      <div className="artist-page col-12">
        <div className="col-12 artist-container">
          <h2 className="title">Artists</h2>
          <div className="col-12 artist-list">
            {artistList &&
              artistList.map(
                (artists, index) =>
                  artists.artists &&
                  artists.artists.map((artist) => {
                    return (
                      <div
                        className="artist"
                        key={Math.random()}
                        style={{
                          backgroundColor: colorsList[index % 8],
                        }}
                        onClick={() => loadArtistSongs(artist.alias, artist.id)}
                      >
                        {artist.alias.charAt(0).toUpperCase() +
                          artist.alias.slice(1)}
                      </div>
                    );
                  })
              )}
          </div>
        </div>
        {songsList && selectedArtist && (
          <div className="col-12 track-list">
            <h3>
              Songs of Artist <span>{selectedArtist}</span>
            </h3>
            <div className="cards col-12 row">
              {songsList.map((song) => (
                <div className="card col-md-4" key={song.title + Math.random()}>
                  <div className="card-wrapper">
                    <img
                      className="card-img-top"
                      src={song.images.coverart}
                      alt="song-cover"
                    />
                    <div className="card-body">
                      <h4>{song.title}</h4>
                      <h6>{song.subtitle}</h6>
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

export default Artists;
