/**
 * @format
 */
import {create, CancelToken} from 'apisauce';
import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native';

import i18n from '../locale';

const cancelRequestList = {};

export const API_ENDPOINT = Config.API_ENDPOINT; //'api/v2/';
const getAPIEndpoint = url => `${url}${API_ENDPOINT}`;

const servers = {
  us: Config.US_SERVER_URL,
  eu: Config.EU_SERVER_URL,
};

const defaultCountry = 'us';

// define the api
export const api = create({
  baseURL: getAPIEndpoint(servers.us),
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

var SERVER_URL = api.getBaseURL().replace(API_ENDPOINT, '');

const captureError = (res, url) => {
  if (!res.ok) {
    const cUrl = `URL:${url},`;
    const message = `Message:${url},`;
    const genTime = `GENERATE_TIME:${new Date().toLocaleString()},`;
    const capMsg = `${cUrl} ${message} ${genTime} ${JSON.stringify(res)}`;
    Sentry.captureMessage(capMsg);
  }
};

export const updateBaseurl = (
  countryCode = defaultCountry,
  from = 'no idea',
) => {
  const serverUrl = servers[countryCode];
  if (serverUrl) {
    const newUrl = getAPIEndpoint(serverUrl);
    api.setBaseURL(newUrl);
    SERVER_URL = api.getBaseURL().replace(API_ENDPOINT, '');
  }
};

const cancelRequests = (...keys) => {
  keys.forEach(key => {
    if (cancelRequestList[key]) {
      cancelRequestList[key]();
    }
  });
};

const getErrorMessage = response => {
  let errorMessage = response.problem;
  if (errorMessage === 'NETWORK_ERROR') {
    errorMessage = 'Network error';
  } else if (errorMessage === 'TIMEOUT_ERROR') {
    errorMessage = 'Something went wrong. Please try again later';
  } else if (errorMessage === 'SERVER_ERROR') {
    errorMessage = 'Server error';
  }
  return errorMessage;
};

const successStatusCodes = [200, 201, 202, 203, 204, 205, 206];

const processResonse = response => {
  const status = successStatusCodes.includes(response.status);
  const data = response.data || {
    status: status,
    message: getErrorMessage(response),
  };
  return {...data, status, cancel: response.problem === 'CANCEL_ERROR'};
};

const get = data => {
  const {url, cancelKey, params, headers} = data;
  const passParams = {...params};
  passParams.language = i18n.language;
  passParams.page = 0;
  passParams.size = 1000;
  passParams.uadt = 1;
  return api
    .get(url, passParams, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
    })
    .then(res => {
      captureError(res, url);
      return processResonse(res);
    });
};

const put = data => {
  const {url, cancelKey, params, headers} = data;
  const passParams = {...params};
  passParams.language = i18n.language;
  passParams.uadt = 1;
  return api
    .put(url, passParams, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
    })
    .then(res => {
      captureError(res, url);
      return processResonse(res);
    });
};

const post = data => {
  const {url, cancelKey, params, headers} = data;
  const passParams = {...params};
  passParams.language = i18n.language;
  passParams.uadt = 1;
  return api
    .post(url, passParams, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
    })
    .then(res => {
      captureError(res, url);
      return processResonse(res);
    });
};

const del = pdata => {
  const {url, cancelKey, params, data, headers} = pdata;
  const passParams = {...params};
  passParams.language = i18n.language;
  passParams.uadt = 1;
  return api
    .delete(url, passParams, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
      data: data,
    })
    .then(res => {
      captureError(res, url);
      return processResonse(res);
    });
};

export {cancelRequests, get, put, post, del, SERVER_URL};
