/**
 * @format
 */
import {useSelector} from 'react-redux';

import {IHistory} from 'interface';
import {RootState} from '../redux/store';

function useHistory(): string[] {
  const {history}: IHistory = useSelector((state: RootState) => state.history);
  return history;
}

export {useHistory};
