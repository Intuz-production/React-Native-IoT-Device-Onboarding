/**
 * @format
 */
import {extendTheme} from 'native-base';
import {fonts, fontConfig} from './common';

const colors = {
  primary: {
    900: '#3BD8F3',
    800: '#655DF2',
    700: '#50C878',
    600: '#B97FF5',
  },
  white: {
    900: '#FFFFFF',
  },
  frame: {
    900: '#000000',
    850: '#181818',
    800: '#333333',
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
    600: '#E5E5E5'
  },
  text: {
    900: '#ffffff',
    800: '#E8E8E8',
    700: '#999999',
  },
  reverseText: {
    900: '#000000',
  },
  border: {
    900: '#3C3C3C',
  },
  transparent: 'rgba(255,255,255,0)',
  link: '#50C878',
  headerTextColor : '#636363', 
};

export const darkTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  colors,
  fontConfig,
  fonts,
});

export type AppTheme = typeof darkTheme;
