import getFocusTrapId from 'helpers/getFocusTrapId';

export default function createFocusTrap(id: string) {
  const trapEl = document.createElement('span');

  trapEl.setAttribute('tabIndex', '0');
  trapEl.dataset.testid = getFocusTrapId(id);

  return trapEl;
}
