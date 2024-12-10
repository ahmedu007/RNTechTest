import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const usePersistLogin = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      // Run biometrics check here before letting the user navigate into the app
      console.log('biometrics check then login');
    }
  }, [isLoggedIn]);

  return isLoggedIn;
};
