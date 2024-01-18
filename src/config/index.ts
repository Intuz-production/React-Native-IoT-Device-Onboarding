/**
 * @format
 */
import Config from 'react-native-config';

export const config = {
  MASTER_API: `${Config.BASE_URL}master/`,
  CATEGORIES_API: `${Config.BASE_URL}categories/`,
  IMAGE_API: `${Config.BASE_URL}image/`,
};

export const APP_BASE_URL = Config.BASE_URL;
export const APP_WEB_URL = Config.WEB_URL;
