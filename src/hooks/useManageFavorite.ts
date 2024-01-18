/**
 * @format
 */
import React from 'react';

import {useFavoriteActions} from '../redux/favorite';
import {useFavorites} from './useFavorites';

export const useManageFavorite = () => {
  const favIds = useFavorites();

  const {setFavorites, loadFavorites} = useFavoriteActions();

  React.useEffect(() => {
    loadFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleFavorite(id: string) {
    const isFavorite = favIds.includes(id);
    const updFavorite = isFavorite
      ? favIds.filter(f => f !== id)
      : [...favIds, id];
    setFavorites(updFavorite);
  }

  return {
    favIds,
    toggleFavorite,
  };
};
