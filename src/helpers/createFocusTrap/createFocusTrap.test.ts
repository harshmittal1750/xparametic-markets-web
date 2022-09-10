import getFocusTrapId from 'helpers/getFocusTrapId';

import createFocusTrap from './createFocusTrap';

enum Trap {
  ID = 'id'
}

describe('createFocusTrap', () => {
  it('should create a focus trapper element correctly', () => {
    const focusTrap = createFocusTrap(Trap.ID);

    expect(focusTrap).toMatchSnapshot();
    expect(focusTrap).toHaveAttribute('data-testid', getFocusTrapId(Trap.ID));
    expect(focusTrap).toHaveAttribute('tabindex', '0');
  });
});
