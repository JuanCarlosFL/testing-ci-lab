import { renderHook } from '@testing-library/react-hooks';
import { usePolling } from './polling.hooks';

describe('usePolling specs', () => {
  it('should call clearInterval when it unmounts the component', () => {
    // Arrange
    const stub = jest.spyOn(window, 'clearInterval');

    // Act
    const { result, unmount } = renderHook(() => usePolling());

    // Assert
    expect(stub).not.toHaveBeenCalled();
    unmount();
    expect(stub).toHaveBeenCalled();
  });

  it('should return count equals 0 when initialize the hook', async() => {
    // Arrange

    // Act
    const { result, waitForValueToChange } = renderHook(() => usePolling());
    await waitForValueToChange(() => result.current.count == 3, {
      timeout: 2000,
    });

    // Assert
   expect(result.current.count).toEqual(3);
  });
});
