/**
 * @format
 */

import {IResponseMeta} from './common';

export interface IUser {
  id: string;
  email: string;
  fullName: string;
}

export interface IUserState {
  isLoggedIn: boolean;
  loading: boolean;
  errorMessage: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser;
}

export interface IProfileResponse extends IResponseMeta {
  data: IUser;
}

export interface IRefreshResponse {
  data: {
    accessToken: string;
  };
}
