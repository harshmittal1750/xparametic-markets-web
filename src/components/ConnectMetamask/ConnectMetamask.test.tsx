import { render, screen } from '@testing-library/react';

import ConnectMetamask from './ConnectMetamask';

describe('ConnectMetamask', () => {
  it('renders metamask warning modal if it is not installed', () => {
    render(<ConnectMetamask />);

    const buttonConnectMetamask = screen.getByRole('button', {
      name: 'Connect MetaMask'
    });

    expect(buttonConnectMetamask).toBeInTheDocument();
    // assert
  });
  // todo: calls the PolkamarketsServices API if it is installed
});
