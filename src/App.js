/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import TrackList from './Components/TrackList/TrackList';
import Artists from './Screens/Artists/Artists';
import Countries from './Screens/Countries/Countries';
import Genres from './Screens/Genres/Genres';
import Home from './Screens/Home/Home';
import Search from './Screens/Search/Search';
import Header from './Shared/Header/Header';
import LeftNavigation from './Shared/Navigation/LeftNavigation';

const App = () => {
  const [apiListId, setApiListId] = useState();
  const [cityName, setCityName] = useState('');
  const [tabName, setTabName] = useState('home');

  let routes = (
    <Switch>
      <Route path="/home" exact>
        <Home />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/genres" exact>
        <Genres tabName={tabName} setTabName={setTabName} />
      </Route>
      <Route path="/countries" exact>
        <Countries
          setApiListId={setApiListId}
          tabName={tabName}
          setTabName={setTabName}
          setCityName={setCityName}
        />
      </Route>
      <Route path="/artists" exact>
        <Artists setApiListId={setApiListId} setTabName={setTabName} />
      </Route>
      <Route path="/tracks" exact>
        <TrackList
          setTabName={setTabName}
          cityName={cityName}
          apiListId={apiListId}
        />
      </Route>
      <Route path="/search" exact>
        <Search
          tabName={tabName}
          setTabName={setTabName}
          setCity={setCityName}
        />
      </Route>
      <Redirect to="/" exact />
    </Switch>
  );

  return (
    <Router>
      <div className="col-12 container">
        <Header tabName={tabName} setTabName={setTabName} />
        <div className="col-12 row body">
          <div className="col-md-2">
            <LeftNavigation tabName={tabName} setTabName={setTabName} />
          </div>
          <div className="col-md-10">{routes}</div>
        </div>
      </div>
    </Router>
  );
};

export default App;
