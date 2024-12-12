import { renderHook } from '@testing-library/react-hooks';

import { useIsMounted } from './useIsMounted';

describe('useIsMounted', () => {
  it('should return true when the component is mounted', () => {
    const { result } = renderHook(() => useIsMounted());

    // When the hook is first used, it should return true
    expect(result.current()).toBe(true);
  });

  it('should return false when the component is unmounted', () => {
    const { result, unmount } = renderHook(() => useIsMounted());

    expect(result.current()).toBe(true);

    unmount();

    expect(result.current()).toBe(false);
  });
});
