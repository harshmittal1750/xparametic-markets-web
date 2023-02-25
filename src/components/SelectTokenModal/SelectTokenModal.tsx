import { useCallback, useState, ChangeEvent, useMemo } from 'react';

import { tokens } from 'config';
import { changeCreateMarketToken } from 'redux/ducks/polkamarkets';
import { Currency } from 'types/currency';
import type { Network } from 'types/network';
import { Token } from 'types/token';
import { Adornment, Container, Tag } from 'ui';

import Modal from 'components/Modal';

import { useAppDispatch, useAppSelector } from 'hooks';

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
  const { createMarketToken } = useAppSelector(state => state.polkamarkets);

  const currency = createMarketToken || network.currency;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  }, []);

  const handleSelect = useCallback(
    (token: Currency | Token) => {
      dispatch(changeCreateMarketToken(token));
      handleHide();
    },
    [handleHide]
  );

  const isAddress = (text: string) => /0[x, X][a-fA-F0-9]{40}/.test(text);

  const currencyByNetwork = network.currency;
  const tokensByNetwork = useMemo(
    () =>
      tokens.filter(token =>
        Object.keys(token.addresses).includes(network.key)
      ),
    []
  );

  const availableTokens = [currencyByNetwork, ...tokensByNetwork];
  const filteredTokens = availableTokens.filter(
    token =>
      token.name.toLowerCase().includes(searchString.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchString.toLowerCase())
  );

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
            onSearch={text => console.log(text)}
            onChange={handleChange}
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
