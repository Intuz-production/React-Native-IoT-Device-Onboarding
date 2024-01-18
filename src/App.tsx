/**
 * @format
 */
import React from 'react';
import {StatusBar, Text, TextInput} from 'react-native';
import {NativeBaseProvider} from 'native-base';

import {useAppThemeName, useAppTheme} from 'theme';
import {ConfirmModalProvider} from 'components';

import NavContainer from './navigation';
import AppProviders from './AppProvider';

import Toast from 'react-native-toast-message';

function SubApp() {
  const themeStyle = useAppThemeName();
  const theme = useAppTheme();

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle={themeStyle === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ConfirmModalProvider>
        <NavContainer />
      </ConfirmModalProvider>
    </NativeBaseProvider>
  );
}

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}

function App() {

  return (
    <AppProviders>
      <SubApp />
      <Toast />
    </AppProviders>
  );
}

export default App;
