import React from 'react';
import spinner from './../../assets/spinner.gif';
import './loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <img
        src={spinner}
        alt="Loading"
        className="horizontal-vertical-middle-align"
      />
    </div>
  );
};

export default Loader;
