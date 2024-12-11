import { useQuery } from '@tanstack/react-query';

import { getAccount } from '@/api';
import { queryClient } from '@/App';

const useAccount = () => {
  const queryFn = async () => {
    const account = await getAccount(); // Use your defined `getAccount` function

    return account;
  };

  const invalidateAccountQuery = () => {
    queryClient.invalidateQueries(['account'] as any);
  };

  return {
    invalidateAccountQuery,
    ...useQuery({
      queryFn,
      queryKey: ['account'],
      refetchInterval: ({ state: { data } }) =>
        data?.status === 'pending' ? 5000 : false,
    }),
  };
};
export default useAccount;
