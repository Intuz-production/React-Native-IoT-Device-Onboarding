/**
 * @format
 */
import React from 'react';

import {useHistory} from './useHistory';
import {useHistoryActions} from '../redux/history';

export const useManageHistory = () => {
  const history = useHistory();

  const {setHistory, loadHistory} = useHistoryActions();

  React.useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addHistoryItem(id: string) {
    if (!history.includes(id)) {
      const updHistory = [id, ...history];
      setHistory(updHistory);
    }
  }

  return {
    history,
    addHistoryItem,
  };
};
