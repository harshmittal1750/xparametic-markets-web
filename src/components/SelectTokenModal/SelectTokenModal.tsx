import { useCallback, useState } from 'react';

import { tokens } from 'config';
import { Adornment, Container } from 'ui';

import { Button } from '../Button';
import Icon from '../Icon';
import Modal from '../Modal';
import SearchBar from '../SearchBar';
import Text from '../Text';
import VirtualizedList from '../VirtualizedList';
import selectTokenModalClasses from './SelectTokenModal.module.scss';

function SelectTokenModal() {
  const [show, setShow] = useState(false);
  const handleHide = useCallback(() => setShow(false), []);

  const isAnAddress = (text: string) => /0[x, X][a-fA-F0-9]{40}/.test(text);

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
        />
        <ul className={selectTokenModalClasses.buttonList}>
          {tokens.map((token, index) => (
            <li key={token.name} tabIndex={index + 1}>
              <Button
                variant="outline"
                color="default"
                className={selectTokenModalClasses.buttonListItem}
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
          data={tokens}
          itemContent={(_index, token) => (
            <div role="button" className={selectTokenModalClasses.listItem}>
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
