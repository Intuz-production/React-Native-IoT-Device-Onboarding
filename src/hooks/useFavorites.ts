/**
 * @format
 */
import {useSelector} from 'react-redux';

import {IFavorites} from 'interface';

import {RootState} from '../redux/store';

function useFavorites(): string[] {
  const {favorites}: IFavorites = useSelector(
    (state: RootState) => state.favorite,
  );
  return favorites;
}

export {useFavorites};
