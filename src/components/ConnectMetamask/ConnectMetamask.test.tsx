import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import store from 'redux/store';
import { PolkamarketsService } from 'services';

import ConnectMetamask from './ConnectMetamask';

const { location, ethereum } = window;
const windowMock = {
  ethereum: {
    on: jest.fn()
  },
  location: {
    reload: jest.fn()
  }
};

function Wrapper({
  // 🐛 BACKLOG: to be imported from some high-level app component
  children
}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MemoryRouter>{children}</MemoryRouter>
      </BrowserRouter>
    </Provider>
  );
}
function renderConnectMetamask({
  isMetamaskInstalled
}: {
  isMetamaskInstalled: boolean;
}) {
  window.ethereum = isMetamaskInstalled && windowMock.ethereum;

  const result = render(<ConnectMetamask />, {
    wrapper: Wrapper
  });
  const a11y = {
    // 🐛 BACKLOG: to be moved to i18n
    name: 'Looks like your browser do not have Metamask installed.',
    desc: 'Please follow up the instructions to install it, make sure your wallet is unlocked with at least one account on it and try again.'
  };
  const assertions = {
    getElements() {
      return {
        buttonConnectMetamask: screen.getByRole('button', {
          name: 'Connect MetaMask'
        }),
        modal: screen.queryByRole('dialog', {
          name: a11y.name
        }) as HTMLElement
      };
    },
    connectMetamask() {
      const { buttonConnectMetamask } = this.getElements();

      expect(buttonConnectMetamask).toBeInTheDocument();
      fireEvent.click(buttonConnectMetamask);
    }
  };

  return {
    a11y,
    assertions,
    ...result
  };
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: 'localhost:3000'
  })
}));

beforeAll(() => {
  delete window.ethereum;
  // @ts-expect-error
  delete window.location;

  Object.defineProperties(window, {
    ethereum: {
      writable: true,
      value: windowMock.ethereum
    },
    location: {
      configurable: true,
      value: windowMock.location
    }
  });
});
afterAll(() => {
  Object.defineProperties(window, {
    ethereum: {
      writable: true,
      value: ethereum
    },
    location: {
      configurable: true,
      value: location
    }
  });
  jest.clearAllMocks();
});
describe('ConnectMetamask', () => {
  it('renders its action button initially', () => {
    const { assertions } = renderConnectMetamask({
      isMetamaskInstalled: false
    });

    expect(assertions.getElements().buttonConnectMetamask).toBeInTheDocument();
    expect(assertions.getElements().modal).not.toBeInTheDocument();
  });
  it('renders its warning modal if it is not installed', () => {
    const { a11y, assertions } = renderConnectMetamask({
      isMetamaskInstalled: false
    });

    assertions.connectMetamask();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: a11y.name
      })
    ).toBeInTheDocument();
    expect(assertions.getElements().modal).toHaveAccessibleName(a11y.name);

    expect(screen.getByText(a11y.desc)).toBeInTheDocument();
    expect(assertions.getElements().modal).toHaveAccessibleDescription(
      a11y.desc
    );
  });
  it('allows to close its warning modal through Hide button', async () => {
    const { assertions } = renderConnectMetamask({
      isMetamaskInstalled: false
    });

    assertions.connectMetamask();

    const hideConnectMetamask = screen.getByRole('button', {
      name: 'Hide'
    });

    expect(hideConnectMetamask).toBeInTheDocument();
    fireEvent.click(hideConnectMetamask);

    await waitFor(() => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });
  it('allows to close its warning modal through click away', async () => {
    const { a11y, assertions } = renderConnectMetamask({
      isMetamaskInstalled: false
    });

    assertions.connectMetamask();

    const root = screen.getByRole('dialog', {
      name: a11y.name
    });

    expect(root).toHaveAccessibleName(a11y.name);
    fireEvent.focusOut(root);

    await waitFor(() => {
      expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });
  });
  it('allows to install MetaMask through website owner', () => {
    const { assertions } = renderConnectMetamask({
      isMetamaskInstalled: false
    });

    assertions.connectMetamask();

    const buttonInstall = screen.getByRole('link', {
      name: 'Install'
    });

    expect(buttonInstall).toBeInTheDocument();
    expect(buttonInstall).toHaveAttribute(
      'href',
      'https://metamask.io/download.html'
    );
  });
  it('allows to try again by reloading the page', () => {
    jest.spyOn(windowMock.location, 'reload');

    const { assertions } = renderConnectMetamask({
      isMetamaskInstalled: false
    });

    assertions.connectMetamask();

    const buttonTryagain = screen.getByRole('button', {
      name: 'Try Again'
    });

    expect(buttonTryagain).toBeInTheDocument();
    fireEvent.click(buttonTryagain);
    expect(windowMock.location.reload).toHaveBeenCalledTimes(1);
  });
  it('calls the PolkamarketsServices API if it is installed', async () => {
    PolkamarketsService.prototype.login = jest.fn();
    PolkamarketsService.prototype.isLoggedIn = jest.fn();

    const { assertions } = renderConnectMetamask({
      isMetamaskInstalled: true
    });

    assertions.connectMetamask();

    expect(assertions.getElements().modal).not.toBeInTheDocument();
    await waitFor(() => {
      expect(PolkamarketsService.prototype.login).toHaveBeenCalledTimes(1);
    });
  });
});
