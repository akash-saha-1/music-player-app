import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './countries.scss';
import Loader from '../../Shared/Loader/Loader';
import { useHttpClient } from '../../Hooks/HttpHook';
import ErrorModal from '../../Shared/Modal/ErrorModal/ErrorModal';

const Countries = (props) => {
  const [countries, setCountries] = useState([]);

  const history = useHistory();
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
    props.setTabName('countries');
    setCountries([]);
    const loadCountries = async () => {
      let response;
      try {
        response = await sendRequest('/charts/list');
        if (response) setCountries(response.countries);
      } catch (err) {
        console.error(err);
      }
    };
    loadCountries();
    // eslint-disable-next-line
  }, []);

  const showCity = useCallback((cityName, cityId) => {
    props.setCityName(cityName);
    props.setApiListId(cityId);
    history.push('/tracks');
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <ErrorModal error={error} onClear={clearError} header="Loading" />

      <div className="country-page col-12">
        <h2 className="title">Countries</h2>
        {countries.map((country, index) => (
          <div
            className="col-12 country-container"
            key={country.id + Math.random()}
            style={{
              backgroundColor: colorsList[index % 8],
            }}
          >
            <h4>{country.name}</h4>
            <div className="col-12 city-list">
              {country.cities.length >= 20 &&
                country.cities.slice(0, 20).map((city) => (
                  <button
                    key={city.id + Math.random()}
                    className="btn btn-info city-button"
                    onClick={() => {
                      showCity(city.name, city.listid);
                    }}
                  >
                    {city.name}
                  </button>
                ))}
              {country.cities.length < 20 &&
                country.cities.map((city) => (
                  <button
                    key={city.id + Math.random()}
                    className="btn btn-info city-button"
                    onClick={() => {
                      showCity(city.name, city.listid);
                    }}
                  >
                    {city.name}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Countries;
