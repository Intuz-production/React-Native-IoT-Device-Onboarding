/**
 * @format
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerNavigationProp,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import Toast from "react-native-toast-message";
import useAppState from "react-native-appstate-hook";
import * as RNLocalize from "react-native-localize";
import SplashScreen from "react-native-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootStackParamList, DrawerParamList } from "interface";
import { isAndroid, storage, StorageKeys } from "constants";
import { switchLanguage } from "localization";
import { fontFamily, useAppTheme } from "theme";

import { TextStyle } from "react-native";
import { navigationRef } from "./navigationRef";
import { getUserProfile } from "../redux/user";
import { useAppDispatch } from "../redux/store";
import { useUserInfo } from "../hooks/useUserInfo";

// Deep Link Configuration
import { linking } from "./linking";

// Screens
import Tutorial from "../screens/Tutorial";
import Settings from "../screens/Settings";
import Login from "screens/Auth/Login";
import OTPScreen from "screens/Auth/OTPScreen";
import HomeScreen from "screens/HomeScreen/Index";
import ConfigScreen from "screens/ConfigScreen/ConfigScreen";
import SuccessScreen from "screens/SuccessContainer/SuccessScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavContainer() {
  const { isLoggedIn } = useUserInfo();
  const theme = useAppTheme();

  const [loading, setLoading] = React.useState(true);
  const [route, setRoute] = React.useState<
    keyof RootStackParamList | undefined
  >(undefined);

  React.useEffect(() => {
    const loadLanguage = async () => {
      const language = storage.getString(StorageKeys.LANGUAGE);
      if (language) {
        await switchLanguage(language);
      } else {
        const locales = RNLocalize.getLocales();
        const lng = locales[0]?.languageCode ?? "en";
        await switchLanguage(lng);
        storage.set(StorageKeys.LANGUAGE, lng);
      }
    };
    loadLanguage();
    const shownTutorial = storage.getBoolean(StorageKeys.SHOWN_TUTORIAL);
    setRoute(shownTutorial ? "Drawer" : "Tutorial");
    // RNBootSplash.hide();
    SplashScreen.hide();
    setLoading(false);
  }, []);

  const dispatch = useAppDispatch();

  const fetchProfile = () => {
    if (isLoggedIn) {
      dispatch(getUserProfile());
    }
  };

  useAppState({
    onForeground: () => {
      fetchProfile();
    },
  });

  const screenOptions: NativeStackNavigationOptions = React.useMemo(() => {
    const headerTitleStyle: Pick<
      TextStyle,
      "fontFamily" | "fontSize" | "fontWeight"
    > & {
      color?: string;
    } = {
      color: theme.colors.text[900],
      fontFamily: fontFamily.light,
      fontSize: 22,
    };
    if (!isAndroid) {
      headerTitleStyle.fontWeight = "400";
    }

    return {
      headerShown: false,
      headerStyle: {
        backgroundColor: theme.colors.frame[900],
        borderBottomColor: "transparent",
        shadowColor: "transparent",
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle,
      headerShadowVisible: false,
    };
  }, [theme]);

  return loading ? null : (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <Stack.Navigator initialRouteName={"Tutorial"} screenOptions={screenOptions}>
          <Stack.Screen
            component={Tutorial}
            name="Tutorial"
            options={{ title: "" }}
          />
          <Stack.Screen
            component={ConfigScreen}
            name="ConfigScreen"
            options={{ title: "" }}
          />
          <Stack.Screen
            component={SuccessScreen}
            name="SuccessScreen"
            options={{ title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

export default NavContainer;
