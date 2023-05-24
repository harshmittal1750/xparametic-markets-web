import { networks } from 'config';

import { useNetworks } from 'contexts/networks';

import { useAppSelector } from 'hooks';

import { ButtonLoading } from '../Button';
import NetworkSwitchClasses from './NetworkSwitch.module.scss';

function toHex(value: string) {
  return `0x${Number(value).toString(16)}`;
}

function getNetworkById(id: string) {
  return networks[toHex(id)];
}

type NetworkSwitchProps = {
  targetNetworkId?: string;
};

function NetworkSwitch({ targetNetworkId }: NetworkSwitchProps) {
  const { changeToNetwork, isChangingNetwork } = useNetworks();

  const marketNetworkId = useAppSelector(
    state => state.market.market.networkId
  );

  const networkId = targetNetworkId || marketNetworkId;

  const marketNetwork = getNetworkById(networkId);

  async function handleChangeNetwork() {
    await changeToNetwork(marketNetwork);
  }

  if (!marketNetwork) return null;

  return (
    <ButtonLoading
      className={NetworkSwitchClasses.button}
      variant="subtle"
      color="default"
      fullwidth
      onClick={() => handleChangeNetwork()}
      loading={isChangingNetwork}
      disabled={isChangingNetwork}
    >
      Switch Network
      {marketNetwork.currency.icon}
    </ButtonLoading>
  );
}

export default NetworkSwitch;
