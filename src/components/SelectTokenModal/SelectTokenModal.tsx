/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState, ChangeEvent, useMemo } from 'react';

import { networks, tokens } from 'config';
import type { Network } from 'types/network';
import { Adornment, Container, Tag } from 'ui';

import { ModalContent } from 'components';
import Modal from 'components/Modal';

import { Button } from '../Button';
import Icon from '../Icon';
import SearchBar from '../SearchBar';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';
import selectTokenModalClasses from './SelectTokenModal.module.scss';

type SelectTokenModalProps = {
  network: Network;
};

const currencyByNetwork = networks['0x2a'].currency;

export default function SelectTokenModal({ network }: SelectTokenModalProps) {
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);
  const [searchString, setSearchString] = useState<string>('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  }, []);

  const handleSelect = useCallback(
    (token: string) => {
      handleHide();
    },
    [handleHide]
  );

  const isAddress = (text: string) => /0[x, X][a-fA-F0-9]{40}/.test(text);

  const tokensByNetwork = useMemo(
    () =>
      tokens.filter(token => Object.keys(token.addresses).includes('goerli')),
    []
  );

  const availableTokens = [currencyByNetwork, ...tokensByNetwork];
  const filteredTokens = availableTokens.filter(
    token =>
      token.name.includes(searchString) || token.ticker.includes(searchString)
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
          {network.currency.icon}
        </Adornment>
        {network.currency.ticker}
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
        <ModalContent className={selectTokenModalClasses.dialogWrapper}>
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
                    onClick={() => handleSelect(token.name)}
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
                  onClick={() => handleSelect(token.name)}
                  onKeyPress={() => handleSelect(token.name)}
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
        </ModalContent>
      </Modal>
    </>
  );
}
