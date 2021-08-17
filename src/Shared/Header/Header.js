import React from 'react';
import './header.scss';

const Header = (props) => {
  const searchSong = () => {
    let searchText = document.getElementById('search-bar').value;
    if (!searchText || searchText.trim().length < 1) {
      return false;
    } else {
      props.setTabName('search');
      window.location.href = '/search?query=' + searchText;
    }
  };

  return (
    <React.Fragment>
      <header className="col-12 row header">
        <div className="col-md-6 title">
          <h3>Music Player</h3>
        </div>
        <div className="col-md-6 search-container">
          <input
            type="text"
            className="search"
            id="search-bar"
            placeholder="Search any songs,artists..."
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={searchSong}
          >
            <i className="fas fa-search" />
          </button>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
