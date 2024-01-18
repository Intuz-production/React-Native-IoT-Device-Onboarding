/**
 * @format
 */

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type DrawerParamList = {
  CreateAI: undefined;
  Profile: undefined;
  HomeScreen: undefined;
  OTPScreen: undefined;
};

export type RootStackParamList = {
  Login: {email?: string};
  Signup: {affiliateId?: string} | undefined;
  ChangePassword: undefined;
  Tutorial: {goBack: boolean} | undefined;
  LegalInfo: {type: number};  
  Drawer: NavigatorScreenParams<DrawerParamList> | undefined;
  Settings: undefined; 
  OTPScreen:  undefined;
  HomeScreen: undefined;
  ConfigScreen: undefined;
  SuccessScreen: {status: boolean};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootStackNavigationProps<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
