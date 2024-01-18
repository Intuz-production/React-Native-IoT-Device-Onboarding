/**
 * @format
 */
import {useDispatch} from 'react-redux';
import {useQuery} from 'react-query';

import {
  getInfo,
  getProvState,
  startNetworkScan,
  getAPList,
  rebootDevice,
} from '../../api/onboardapi';

const useOnboarding = () => {
  const dispatch = useDispatch();

  const tryGetInfo = useQuery(['info'], () => getInfo(), {
    cacheTime: 0,
  });

  const tryGetProvState = useQuery(['provState'], () => getProvState(), {
    onSuccess: (data) => {
      console.log('Device provisional state got', data);
    },
    enabled: false,
    cacheTime: 0,
    retry: true,
    retryDelay: 3000
  });

  const tryNetworkScanning = useQuery(
    ['networkscan'],
    () => startNetworkScan(),
    {enabled: false, cacheTime: 0, retry: 3, retryDelay: 3000},
  );

  const tryGetAPList = useQuery(['APList'], () => getAPList(), {
    enabled: false,
    cacheTime: 0,
    retry: 3,
    retryDelay: 3000
  });

  const tryReboot = useQuery(['reboot'], () => rebootDevice(), {
    onSuccess: () => {
      // toggleLoader(false);
      console.log('Device rebooted successfully');
    },
    onFailure: () => {
      // toggleLoader(false);
      console.log('Device rebooted failed');
    },
    enabled: false,
    cacheTime: 0,
    retry: 0,
  });

//   const toggleLoader = (visible, text) => {
//     dispatch(toggleGlobalLoader({visible, text}));
//   };

  const allItems = tryGetAPList?.data?.filter((i) => i.ssid.trim().length > 0)
    ?.map((l,i) => ({ value: l.ssid, label: l.ssid, ...l }));

  return {
    tryGetInfo,
    tryGetProvState,
    tryNetworkScanning,
    tryGetAPList: {...tryGetAPList, data: allItems},
    // toggleLoader,
    tryReboot,
  };
};

export {useOnboarding};
