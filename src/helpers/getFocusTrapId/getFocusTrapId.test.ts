import getFocusTrapId from './getFocusTrapId';

describe('getFocusTrapId', () => {
  it('returns focus trapper node id attr value', () => {
    const focusTrapId = getFocusTrapId('id');

    expect(focusTrapId).toBe('focus-trap-id');
  });
});
