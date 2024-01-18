/**
 * @format
 */
import {extendTheme} from 'native-base';
import {fonts, fontConfig} from './common';

const colors = {
  primary: {
    900: '#2E53A5',
    800: '#003A52',
    700: '#6994FF',
  },
  white: {
    900: '#FFFFFF',
  },
  frame: {
    900: '#ffffff',
    850: '#ECECEC',
    800: '#E1E1E1',
  },
  black: {
    900: '#000000',
    850: '#0D0D0D',
    800: '#3C3C3C',
    700: '#181818',
  },
  message: {
    900: '#2196F3', // Info
    800: '#E80049', // Error
    700: '#FFCA28', // Warning
    600: '#4CAF50', // Success
  },
  gray: {
    900: '#222222',
    850: '#777777',
    800: '#666666',
    700: '#999999',
    650: '#A5A5A5',
    600: '#E8E8E8',
  },
  text: {
    900: '#000000',
    800: '#1B1B1B',
    700: '#555555',
  },
  reverseText: {
    900: '#ffffff',
  },
  border: {
    900: '#EBEBEB',
  },
  transparent: 'rgba(255,255,255,0)',
};

export const Gradients = {
  primary: ['#EAEE14', '#FC126C', '#254BAF', '#2ECDD4'],
  secondary: ['#A4F63C', '#1E44BB', '#2998C9'],
};

export const lightTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  colors,
  fontConfig,
  fonts,
});
