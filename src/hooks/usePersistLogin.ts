import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const usePersistLogin = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  useEffect(() => {
    // Here we can do multiple checks if necessary before letting the user go into the app
    if (isLoggedIn) {
      // fetch user credentials from encrypted storage?
      // Run biometrics check here before letting the user navigate into the app
      console.log('biometrics check then login');
    }
  }, [isLoggedIn]);

  return isLoggedIn;
};
