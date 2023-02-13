import { useCallback, useState, ChangeEvent, useMemo } from 'react';

import { networks, tokens } from 'config';
import { Adornment, Container } from 'ui';

import { Button } from '../Button';
import Icon from '../Icon';
import Modal from '../Modal';
import SearchBar from '../SearchBar';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';
import selectTokenModalClasses from './SelectTokenModal.module.scss';

const network = 'goerli';

function SelectTokenModal() {
  const [show, setShow] = useState(true);
  const handleHide = useCallback(() => setShow(false), []);

  const [searchString, setSearchString] = useState<string>('');

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  }, []);

  const handleSelect = useCallback(() => {
    handleHide();
  }, [handleHide]);

  const isAnAddress = (text: string) => /0[x, X][a-fA-F0-9]{40}/.test(text);

  const currencyByNetwork = networks['0x2a'].currency;

  const tokensByNetwork = useMemo(
    () =>
      tokens.filter(token => Object.keys(token.addresses).includes(network)),
    []
  );

  const availableTokens = [currencyByNetwork, ...tokensByNetwork];
  const filteredTokens = availableTokens.filter(
    token =>
      token.name.includes(searchString) || token.ticker.includes(searchString)
  );

  return (
    <Modal
      disableGutters
      show={show}
      onHide={handleHide}
      size="sm"
      centered
      className={{
        dialog: selectTokenModalClasses.dialog
      }}
    >
      <Container $as="header" className={selectTokenModalClasses.dialogHeader}>
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
            aria-label="Settings"
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
                onClick={handleSelect}
              >
                <Icon
                  name={token.iconName}
                  className={selectTokenModalClasses.buttonListItemIcon}
                />
                <span className={selectTokenModalClasses.buttonListItemTicker}>
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
              onClick={handleSelect}
              onKeyPress={handleSelect}
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
  );
}

export default SelectTokenModal;
