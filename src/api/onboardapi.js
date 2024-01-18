/**
 * @format
 */
import {get, post} from './index';
import {routes} from './routes';

export const getInfo = () => {
  return get({
    url: routes.getInfo,
    cancelKey: 'getInfo',
  }).then(res => {
    const {status, data, message} = res;
    if (status) {
      return data;
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};

export const getProvState = () => {
  return get({
    url: routes.getProvState,
    cancelKey: 'getProvState',
  }).then(res => {
    const {status, data, message} = res;
    if (status) {
      return data;
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};

export const startNetworkScan = () => {
  return post({
    url: routes.scanWifi,
    cancelKey: 'scanWifi',
    params: {cmd: 4},
  }).then(res => {
    const {status, data, message} = res;
    if (status && data.Ok === 1) {
      return data;
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};

export const getAPList = () => {
  return get({
    url: routes.getAPList,
    cancelKey: 'getAPList',
  }).then(res => {
    const {status, data, message} = res;
    if (status) {
      return data.ssidList ?? [];
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};

export const sendWifiCredentials = params => {
  return post({
    url: routes.wifiCredentials,
    cancelKey: 'wifiCredentials',
    params,
  }).then(res => {
    const {status, data, message} = res;
    console.log('res: ', res);
    if (status && data.Ok === 1) {
      return data;
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};

export const sendEndPoint = params => {
  console.log('params: ', params);
  return post({
    url: routes.endpoint,
    cancelKey: 'endpoint',
    params,
  }).then(res => {
    console.log('res: ', res);
    const {status, data, message} = res;
    if (status && data.Ok === 1) {
      return data;
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};

export const rebootDevice = () => {
  return get({
    url: routes.reboot,
    cancelKey: 'reboot',
  }).then(res => {
    const {status, data, message} = res;
    if (status) {
      return data;
    } else {
      const error = message || 'Something went wrong';
      throw new Error(error);
    }
  });
};
