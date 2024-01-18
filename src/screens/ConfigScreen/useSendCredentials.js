/**
 * @format
 */
import {useEffect} from 'react';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';

import {sendWifiCredentials} from '../../api/onboardapi';

const useSendCredentials = () => {
  const dispatch = useDispatch();

  const sendCredentials = useMutation(params => sendWifiCredentials(params), {
    onSuccess: (_data, variables) => {
      console.log('_data: ', _data);
      const {callback} = variables;
      callback && callback();
    },
    onError: error => {
      console.log(error.message)
    },
  });
  // const {isLoading} = sendCredentials;

  const trySendCredentials = params => sendCredentials.mutate(params);

  // useEffect(() => {
  //   dispatch(toggleGlobalLoader({visible: isLoading}));
  // }, [dispatch, isLoading]);

  return {...sendCredentials, trySendCredentials};
};

export {useSendCredentials};
