import React from 'react';
import './leftNavigation.scss';

const LeftNavigation = (props) => {
  const tab = props.tabName;

  return (
    <div className="left-menu">
      <h3>Libraries</h3>
      <ul>
        <li className={tab === 'home' ? `active` : ''}>
          <a
            href="/"
            onClick={() => {
              document.getElementById('search-bar').value = '';
              props.setTabName('home');
            }}
          >
            Home
          </a>
        </li>
        <li className={tab === 'genres' ? `active` : ''}>
          <a
            href="/genres"
            onClick={() => {
              document.getElementById('search-bar').value = '';
              props.setTabName('genres');
            }}
          >
            Genres
          </a>
        </li>
        <li className={tab === 'countries' ? `active` : ''}>
          <a
            href="/countries"
            onClick={() => {
              document.getElementById('search-bar').value = '';
              props.setTabName('countries');
            }}
          >
            Countries
          </a>
        </li>
        <li className={tab === 'artists' ? `active` : ''}>
          <a
            href="/artists"
            onClick={() => {
              document.getElementById('search-bar').value = '';
              props.setTabName('artists');
            }}
          >
            Artists
          </a>
        </li>
        <li className={tab === 'search' ? `active` : ''}>
          <a
            href="/search"
            onClick={() => {
              props.setTabName('search');
            }}
          >
            Search Results
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftNavigation;
