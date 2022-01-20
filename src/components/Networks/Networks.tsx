import { ReactNode, useState, useRef, useEffect } from 'react';

import classNames from 'classnames';

import { CaretDownFilledIcon } from 'assets/icons';

import Text from '../Text';

export type NetworkColorVariant = 'blue' | 'orange' | 'green';

export type Network = {
  id: string;
  name: string;
  icon: ReactNode;
  color: NetworkColorVariant;
};

type NetworksProps = {
  networks: Network[];
};

function Networks({ networks }: NetworksProps) {
  const [currentNetwork, setCurrentNetwork] = useState<Network>(networks[0]);
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const ref = useRef<HTMLOListElement>(null);

  function handleToggleDropdownVisibility() {
    setDropdownIsVisible(!dropdownIsVisible);
  }

  function handleCloseDropdown() {
    setDropdownIsVisible(false);
  }

  function handleSelectNetwork(network: Network) {
    setCurrentNetwork(network);
    handleCloseDropdown();
  }

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      handleCloseDropdown();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="pm-c-networks">
      <button
        type="button"
        className={`pm-c-button pm-c-networks__selected--${currentNetwork.color}`}
        onClick={handleToggleDropdownVisibility}
      >
        {currentNetwork.icon}
        <Text
          as="span"
          scale="caption"
          fontWeight="semibold"
          className="pm-c-networks__selected-name"
        >
          {currentNetwork.name}
        </Text>
        <CaretDownFilledIcon className="pm-c-networks__selected-caret-icon" />
      </button>
      <ol
        ref={ref}
        className={classNames({
          'pm-c-networks__dropdown': true,
          visible: dropdownIsVisible
        })}
      >
        {networks.map(network => (
          <li key={network.id}>
            <button
              type="button"
              className="pm-c-button-normal--noborder pm-c-networks__dropdown-item"
              onClick={() => handleSelectNetwork(network)}
            >
              <Text
                as="span"
                scale="caption"
                fontWeight="semibold"
                className="pm-c-networks__dropdown-item-name"
              >
                {network.name}
              </Text>
              {network.icon}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Networks;
