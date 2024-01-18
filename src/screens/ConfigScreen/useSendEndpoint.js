/**
 * @format
 */
import {useEffect} from 'react';
import {useMutation} from 'react-query';
import {useDispatch} from 'react-redux';

import {sendEndPoint} from '../../api/onboardapi';

const useSendEndpoint = () => {
  const dispatch = useDispatch();

  const sendEndpointMutation = useMutation(params => sendEndPoint(params), {
    onSuccess: (_data, variables) => {
      const {callback} = variables;
      callback && callback();
    },
    onError: error => {
      // dispatch(toastError(error.message));
    },
  });
  const {isLoading} = sendEndpointMutation;

  const trySendEndpoint = params => sendEndpointMutation.mutate(params);

  // useEffect(() => {
  //   dispatch(toggleGlobalLoader({visible: isLoading}));
  // }, [dispatch, isLoading]);

  return {...sendEndpointMutation, trySendEndpoint};
};

export {useSendEndpoint};
