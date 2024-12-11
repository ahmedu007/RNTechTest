import { useCallback, useEffect, useRef } from 'react';

function useIsMounted() {
  const isMounted = useRef(false); // unmounted by default

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}

export default useIsMounted;
