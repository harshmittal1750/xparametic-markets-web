import getFocusTrapId from './getFocusTrapId';

describe('getFocusTrapId', () => {
  it('should return an ID correctly', () => {
    const focusTrapId = getFocusTrapId('id');

    expect(focusTrapId).toBe('focus-trap-id');
  });
});
