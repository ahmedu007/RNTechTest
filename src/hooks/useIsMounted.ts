import { useCallback, useEffect, useRef } from 'react';

export function useIsMounted() {
  const isMounted = useRef(false); // unmounted by default

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
