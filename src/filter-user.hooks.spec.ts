import { renderHook, act } from '@testing-library/react-hooks';
import * as api from './api';
import { useFilterUsers } from './filter-user.hooks';

describe('useFilterUsers specs', () => {
  it('should call getUsersByFilter and update users when it feeds filter equals "doe"', async () => {
    // Arrange
    const filter = 'doe';
    const stub = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);
    // Act
    const { result, waitForNextUpdate } = renderHook(()=>useFilterUsers(filter));
    await waitForNextUpdate();

    // Assert
    expect(stub).toHaveBeenCalledWith(filter);
    expect(result.current.users).toEqual(['John Doe', 'Jane Doe']);
  });

  it('should call getUsersByFilter only one time when it calls filterUsers with same filter two times', async () => {
    // Arrange
    const filter = 'doe';
    const stub = jest
      .spyOn(api, 'getUsersByFilter')
      .mockResolvedValue(['John Doe', 'Jane Doe']);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useFilterUsers(filter)
    );

    // Assert
    expect(result.current.users).toEqual([]);

    await waitForNextUpdate();
    act(() => {
      result.current.setFilter('smith');
    });

    expect(stub).toHaveBeenCalledTimes(2);
  });
});
