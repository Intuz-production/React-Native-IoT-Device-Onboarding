/**
 * @format
 */
import {create, CancelToken} from 'apisauce';
import Config from 'react-native-config';

const cancelRequestList = {};
console.log(Config.AP_MODE_URL);

// define the api
export const api = create({
  baseURL: 'http://192.168.4.1/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
  timeout: __DEV__ ? 10000 : 300000,
});

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
  return {
    status,
    message: getErrorMessage(response),
    data: response.data,
    cancel: response.problem === 'CANCEL_ERROR',
  };
};

const get = data => {
  const {url, cancelKey, params, headers} = data;
  return api
    .get(url, params, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
    })
    .then(res => {
      // captureError(res, url);
      return processResonse(res);
    });
};

const put = data => {
  const {url, cancelKey, params, headers} = data;
  return api
    .put(url, params, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
    })
    .then(res => {
      // captureError(res, url);
      return processResonse(res);
    });
};

const post = data => {
  const {url, cancelKey, params, headers} = data;
  return api
    .post(url, params, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
    })
    .then(res => {
      // captureError(res, url);
      return processResonse(res);
    });
};

const del = pdata => {
  const {url, cancelKey, params, data, headers} = pdata;
  return api
    .delete(url, params, {
      cancelToken: new CancelToken(c => (cancelRequestList[cancelKey] = c)),
      headers,
      data: data,
    })
    .then(res => {
      // captureError(res, url);
      return processResonse(res);
    });
};

export {cancelRequests, get, put, post, del};
