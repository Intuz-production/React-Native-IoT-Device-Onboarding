/**
 * @format
 */
import {Linking} from 'react-native';
import {LinkingOptions, getStateFromPath} from '@react-navigation/native';

import {RootStackParamList} from 'interface';

const prefixes: string[] = ['intuCharge://', 'https://dev.intuCharge.com'];

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes,

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },

  config: {
    initialRouteName: 'Tabs',
    screens: {
      Login: {path: 'login'},
      Signup: {path: 'signup/:affiliateId'},
    },
  },

  getStateFromPath: (path, options) => {
    return getStateFromPath(path, options);
  },
};
