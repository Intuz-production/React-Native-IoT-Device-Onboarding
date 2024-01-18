/**
 * @format
 */
import Toast, {ToastShowParams} from 'react-native-toast-message';
import {
  // eslint-disable-next-line react-native/split-platform-components
  PermissionsAndroid,
  Dimensions,
  Keyboard,
  Platform,
  StyleProp,
  ViewStyle,
  StatusBar,
} from 'react-native';
import {MMKV} from 'react-native-mmkv';

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const KEYBOARD_EXTRA_HEIGHT = 200;

export const isAndroid = Platform.OS === 'android';

export const RECORD_PER_PAGE = 12;

export enum StorageKeys {
  LANGUAGE = 'language',
  SHOWN_TUTORIAL = 'shownTutorial',
  IS_PRO = 'isPro',
  NAME = 'name',
  PROFILE_IMAGE = 'profileImage',
  FAVORITES = 'favorites',
  HISTORY = 'history',
  DEFAULT_HISTORY = 'default_history',
}

export const storage = new MMKV();

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const closeKeyboard = () => Keyboard.dismiss();

export type ViewStyleProps = StyleProp<ViewStyle>;

export * from './QueryKeys';

type ToastOptions = ToastShowParams & {message: string};

export function showSnackbar(props: ToastOptions) {
  const {type = 'success', message = 'No message', ...rest} = props;
  Toast.show({
    type,
    text1: message,
    visibilityTime: 6000,
    ...rest,
    topOffset: isAndroid ? 20 : 80,
  });
}

export async function canSaveToAndroid() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}
