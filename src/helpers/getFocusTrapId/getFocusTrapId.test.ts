import getFocusTrapId from './getFocusTrapId';

const defaults = {
  id: 'trap'
};

describe('getFocusTrapId', () => {
  it('should return an ID correctly', () => {
    const focusTrapId = getFocusTrapId(defaults.id);

    expect(focusTrapId).toBe(`focus-trap-${defaults.id}`);
  });
});
