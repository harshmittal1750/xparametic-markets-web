import { useCallback, useState, ChangeEvent, useMemo } from 'react';

import { tokens } from 'config';
import { changeCreateMarketToken } from 'redux/ducks/polkamarkets';
import { PolkamarketsService } from 'services';
import { Currency } from 'types/currency';
import type { Network } from 'types/network';
import { Token } from 'types/token';
import { Adornment, Container, Tag } from 'ui';

import Modal from 'components/Modal';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import { Button } from '../Button';
import Icon from '../Icon';
import SearchBar from '../SearchBar';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';
import selectTokenModalClasses from './SelectTokenModal.module.scss';

type SelectTokenModalProps = {
  network: Network;
};

export default function SelectTokenModal({ network }: SelectTokenModalProps) {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);
  const [searchString, setSearchString] = useState<string>('');
  const [searchToken, setSearchToken] = useState<any>(null);
  const { createMarketToken } = useAppSelector(state => state.polkamarkets);
  const { networkConfig } = useNetwork();

  const currency = createMarketToken || network.currency;

  const handleChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;

      setSearchString(text);

      const isAddress = /0[x, X][a-fA-F0-9]{40}/.test(text);

      if (isAddress) {
        const polkamarketsService = new PolkamarketsService(networkConfig);
        // fetching token info from blockchain
        const tokenInfo = await polkamarketsService.getERC20TokenInfo(text);

        if (tokenInfo) {
          setSearchToken(tokenInfo);
        }
      } else {
        setSearchToken(null);
      }
    },
    [networkConfig]
  );

  const handleSelect = useCallback(
    (token: Currency | Token) => {
      dispatch(changeCreateMarketToken(token));
      handleHide();
    },
    [handleHide, dispatch]
  );

  const currencyByNetwork = network.currency;
  const tokensByNetwork = useMemo(
    () =>
      tokens.filter(token =>
        Object.keys(token.addresses).includes(network.key)
      ),
    [network.key]
  );

  const availableTokens = [currencyByNetwork, ...tokensByNetwork];
  const filteredTokens = availableTokens.filter(
    token =>
      token.name.toLowerCase().includes(searchString.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchString.toLowerCase())
  );

  if (searchToken) {
    const tokenByTicker = (Object.values(tokens).find(
      token => token.ticker === searchToken.ticker
    ) || Object.values(tokens).find(token => token.ticker === 'TOKEN')) as any;

    const res = { ...tokenByTicker };

    res.name = searchToken.name;
    res.ticker = searchToken.ticker;
    res.symbol = searchToken.symbol;
    res.addresses = {
      [network.key]: searchToken.address
    };

    filteredTokens.push(res);
  }

  return (
    <>
      <Tag
        onClick={() => setShow(true)}
        $color="default"
        $size="sm"
        $variant="subtle"
      >
        <Adornment $size="sm" $edge="start">
          <Icon name={currency.iconName} />
        </Adornment>
        {currency.ticker}
        <Adornment $size="sm" $edge="end">
          <Icon name="Chevron" dir="down" />
        </Adornment>
      </Tag>
      <Modal
        show={show}
        onHide={handleHide}
        disableGutters
        size="sm"
        centered
        className={{
          dialog: selectTokenModalClasses.dialog
        }}
      >
        <Container
          $as="header"
          className={selectTokenModalClasses.dialogHeader}
        >
          <Text
            scale="heading"
            fontWeight="bold"
            className={selectTokenModalClasses.dialogHeaderTitle}
          >
            Select a token
          </Text>
          <Adornment $edge="end">
            <Button
              size="xs"
              variant="ghost"
              color="default"
              aria-label="Close"
              onClick={handleHide}
            >
              <Icon name="Cross" size="lg" />
            </Button>
          </Adornment>
        </Container>
        <Container className={selectTokenModalClasses.dialogContent}>
          <SearchBar
            placeholder="Search name or paste address"
            onChange={handleChange}
            onSearch={() => {}}
            value={searchString}
          />
          <ul className={selectTokenModalClasses.buttonList}>
            {filteredTokens.map((token, index) => (
              <li key={token.name} tabIndex={index + 1}>
                <Button
                  variant="outline"
                  color="default"
                  className={selectTokenModalClasses.buttonListItem}
                  onClick={() => handleSelect(token)}
                >
                  <Icon
                    name={token.iconName}
                    className={selectTokenModalClasses.buttonListItemIcon}
                  />
                  <span
                    className={selectTokenModalClasses.buttonListItemTicker}
                  >
                    {token.ticker}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </Container>
        <Container className={selectTokenModalClasses.dialogList}>
          <VirtualizedList
            height="100%"
            data={filteredTokens}
            itemContent={(_index, token) => (
              <div
                role="button"
                tabIndex={0}
                className={selectTokenModalClasses.listItem}
                onClick={() => handleSelect(token)}
                onKeyPress={() => handleSelect(token)}
              >
                <Icon
                  name={token.iconName}
                  className={selectTokenModalClasses.listItemIcon}
                />
                <div className={selectTokenModalClasses.listItemNameGroup}>
                  <span className={selectTokenModalClasses.listItemName}>
                    {token.name}
                  </span>
                  <span className={selectTokenModalClasses.listItemTicker}>
                    {token.ticker}
                  </span>
                </div>
              </div>
            )}
          />
        </Container>
      </Modal>
    </>
  );
}
