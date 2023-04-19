import { useState } from 'react';

import type { Meta } from '@storybook/react';

import Popover from './Popover';

function Template() {
  const [show, setShow] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <button type="button" onClick={event => setShow(event.currentTarget)}>
        {show ? 'Hide' : 'Show'}
      </button>
      <Popover
        show={show}
        position={{ x: 'left', y: 'bottom' }}
        onHide={() => setShow(null)}
      >
        Hello
      </Popover>
    </>
  );
}

const PopoverMeta: Meta<typeof Popover> = {
  component: Popover
};

export const PopoverExample = {
  render: () => <Template />
};
export default PopoverMeta;
