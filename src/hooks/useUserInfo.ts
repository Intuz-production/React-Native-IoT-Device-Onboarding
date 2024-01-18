/**
 * @format
 */
import {useSelector} from 'react-redux';

import {IUserState} from 'interface';

import {RootState} from '../redux/store';

function useUserInfo(): IUserState {
  const userInfo: IUserState = useSelector((state: RootState) => state.user);
  return userInfo;
}

export {useUserInfo};
