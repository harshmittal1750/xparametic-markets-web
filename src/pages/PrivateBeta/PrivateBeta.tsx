import React, { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import * as whitelistService from 'services/Polkamarkets/whitelist';

import { ArrowRightIcon, PolkamarketsIcon } from 'assets/icons';

import {
  Button,
  ModalNotification,
  Text,
  Toast,
  ToastNotification
} from 'components';

import { useAppDispatch, useLocalStorage } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

function PrivateBeta() {
  const [wrongWallet, setWrongWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useLocalStorage<string | undefined>(
    'walletAddress',
    undefined
  );
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();
  const { show } = useToastNotification();

  function handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setAddress(value);
  }

  async function handleSubmit(event) {
    // preventing form redirect
    event.preventDefault();

    const response = await whitelistService.getWhitelistStatus(address);
    const { data } = response;

    // could be improved but no need for - it's a temporary service
    if (data?.whitelisted) {
      setWalletAddress(address);
      // forcing a browser refresh - routes conditions have changed
      window.location.reload();
    } else {
      setWrongWallet(true);
      show('wrong-wallet');
    }
  }

  // TODO: Add address validation
  const isValidAddress = !isEmpty(address);

  return (
    <div className="pm-private-beta">
      <ModalNotification visible>
        <div className="pm-private-beta__card">
          <PolkamarketsIcon />
          <Text
            as="h5"
            scale="heading"
            fontWeight="bold"
            color="white"
            style={{ textAlign: 'center' }}
          >
            Polkamarkets is on Private Beta
          </Text>
          <Text
            as="p"
            scale="caption"
            fontWeight="medium"
            color="lighter-gray"
            style={{ textAlign: 'center', paddingBottom: '1rem' }}
          >
            We’re currently on a private beta. Only whitelisted addresses can
            use our platform. Connect your wallet and start predicting a better
            future.
          </Text>
          <form className="pm-private-beta__form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="pm-private-beta__form-input"
              name="address"
              placeholder="Enter your wallet address"
              value={address}
              onChange={event => handleChangeAddress(event)}
            />
            <Button type="submit" color="primary" disabled={!isValidAddress}>
              <ArrowRightIcon />
            </Button>
          </form>
        </div>
      </ModalNotification>
      {wrongWallet ? (
        <ToastNotification id="wrong-wallet" duration={5000}>
          <Toast
            variant="danger"
            title="Wrong Wallet"
            description="Your wallet isn’t whitelisted. Please connect the correct one to start using the platform."
          />
        </ToastNotification>
      ) : null}
    </div>
  );
}

PrivateBeta.displayName = 'PrivateBeta';

export default PrivateBeta;
