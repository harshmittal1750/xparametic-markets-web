import { render, screen } from '@testing-library/react';

import ConnectMetamask from './ConnectMetamask';
import { connectMetamaskProps } from './ConnectMetamask.util';

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
  it('renders accessible title and description content', () => {
    render(<ConnectMetamask />);

    const name = connectMetamaskProps['aria-labelledby'];
    const desc = connectMetamaskProps['aria-describedby'];

    expect(
      screen.getByRole('heading', {
        level: 2,
        name
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('dialog', {
        name
      })
    ).toHaveAccessibleName(name);

    expect(screen.getByText(desc)).toBeInTheDocument();
    expect(
      screen.getByRole('dialog', {
        name
      })
    ).toHaveAccessibleDescription(desc);
  });
});
