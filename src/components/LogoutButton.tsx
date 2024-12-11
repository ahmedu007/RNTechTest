import { Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { resetAccount } from '@/api';
import { queryClient } from '@/App';
import { logoutUser } from '@/redux/actions/userActions';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await resetAccount();
    queryClient.clear();
    dispatch(logoutUser());
    // Clear encrypted storage if tokens are set there
  };
  return <Button title="Logout" onPress={handleLogout} />;
}
