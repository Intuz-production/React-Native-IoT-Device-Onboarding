/**
 * @format
 */
import {useQuery} from 'react-query';

import {getEndpoint} from '../../api/onboardapi';
import {QueryKeys} from '../../api/querykeys';

const useEndPoint = () => {
  const cacheKey = [QueryKeys.endpoint];
  return useQuery(cacheKey, () => getEndpoint(), {retry: 5, enabled: false});
};

export {useEndPoint};
