import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_RAPID_API_URL);
  const [apiHost, setApiHost] = useState(process.env.REACT_APP_RAPID_API_HOST);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_RAPID_API_KEY);
  const [apiLocale, setApiLocale] = useState(
    process.env.REACT_APP_RAPID_API_LOCALE
  );

  useEffect(() => {
    setApiUrl(process.env.REACT_APP_RAPID_API_URL);
    setApiHost(process.env.REACT_APP_RAPID_API_HOST);
    setApiKey(process.env.REACT_APP_RAPID_API_KEY);
    setApiLocale(process.env.REACT_APP_RAPID_API_LOCALE);
  }, []);

  const sendRequest = useCallback(async (url, method = 'GET', body = null) => {
    if (url.indexOf('/charts/list') > -1) {
      url = apiUrl + url;
    } else {
      url = apiUrl + url + '&locale=' + apiLocale;
    }
    setIsLoading(true);

    var options = {
      method: method,
      url: url,
      params: {},
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    };

    let responseData;
    await axios
      .request(options)
      .then((response) => {
        responseData = response.data;
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
        throw error;
      });
    return responseData;
    // eslint-disable-next-line
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
