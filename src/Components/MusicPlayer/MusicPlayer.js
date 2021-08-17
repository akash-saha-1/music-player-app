import React, { useState, useEffect, useCallback } from 'react';
import './musicPlayer.scss';

const MusicPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [music, setMusic] = useState();
  const song = props.song;

  useEffect(() => {
    setIsPlaying(false);
    if (music) {
      music.pause();
    }
    setMusic(null);
    if (song) {
      setImage(song.images.coverart);
      setTitle(song.title);
      setSubTitle(song.subtitle);
      setMusic(new Audio(song.hub.actions[1].uri));
    }
    // eslint-disable-next-line
  }, [song]);

  useEffect(() => {
    const startMusic = () => {
      if (music) {
        setIsPlaying(true);
        music.play();
      }
    };
    startMusic();
    // eslint-disable-next-line
  }, [music]);

  const playPauseMusic = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      music.pause();
    } else {
      setIsPlaying(true);
      music.play();
    }
    // eslint-disable-next-line
  }, [isPlaying, music]);

  return (
    <React.Fragment>
      {song && (
        <div className="col-12 row music-container">
          <div className="col-10 details-wrapper">
            <div className="image">
              <img src={image} alt="music" />
            </div>
            <div className="details">
              <p className="preview">Now Playing</p>
              <h6 className="title">{title}</h6>
              <h6 className="text-xs subtitle">{subTitle}</h6>
            </div>
          </div>
          <div className="col-2 playing-wrapper">
            <div className="play-icon" onClick={playPauseMusic}>
              {isPlaying ? (
                <i className="fas fa-pause-circle"></i>
              ) : (
                <i className="fas fa-play-circle"></i>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MusicPlayer;
