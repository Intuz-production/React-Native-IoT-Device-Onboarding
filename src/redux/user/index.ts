/**
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer} from 'redux-persist';

import client from 'api';
import {IUser, IUserState, IProfileResponse, IRefreshResponse} from 'interface';

import {RootState, useAppDispatch} from '../store';
import {config} from '../../config';

export const initialUserAuthData: IUser = {
  id: '',
  email: '',
  fullName: '',
};

const initialState: IUserState = {
  isLoggedIn: false,
  loading: false,
  accessToken: null,
  refreshToken: null,
  errorMessage: null,
  user: {} as IUser,
};

type UserInfo = {
  authenticated?: boolean;
  accessToken?: string;
  refreshToken?: string;
  user: IUser;
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      if (action.payload.accessToken) {
        state.accessToken = action.payload.accessToken;
      }
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    updateProfilePic: (state, {payload}) => {
      state.user = {...state.user, ...payload};
    },
    logoutUser: state => {
      state.isLoggedIn = initialState.isLoggedIn;
      state.loading = initialState.loading;
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.errorMessage = initialState.errorMessage;
      state.user = initialState.user;
    },
  },
});

export const {setAccessToken, setUserInfo, logoutUser, updateProfilePic} =
  userSlice.actions;

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  return {
    setUserInfo: (data: UserInfo) => dispatch(setUserInfo(data)),
    logoutUser: () => dispatch(logoutUser()),
  };
};

const persistConfig: PersistConfig<IUserState> = {
  key: 'user',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['userAuthData'],
};

export const getUserProfile = createAsyncThunk(
  'users/profile',
  async (_info, thunkApi) => {
    const state = thunkApi.getState();
    const currentUser = (state as RootState)?.user;
    if (currentUser.isLoggedIn && currentUser.accessToken) {
      // const url = `${config.USER_API}/users/${currentUser.user.id}`;
      const url = `/users/`;
      const response: IProfileResponse = await client.get(url);
      thunkApi.dispatch(setUserInfo({user: response.data}));
    }
  },
);

export const refreshToken = async (rToken: string) => {
  try {
    // const url = `${config.USER_API}/users/refreshToken`;
    const url = `/users/`;
    const data = {refreshToken: rToken};
    const response: IRefreshResponse = await client.post(url, data);
    return Promise.resolve(response.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default persistReducer(persistConfig, userSlice.reducer);
