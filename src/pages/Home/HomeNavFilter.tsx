import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { Adornment, Divider, List, ListItem, ListItemText } from 'ui';

import { Button, Icon, Modal, ToggleSwitch } from 'components';

function ListItemNested() {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <ListItem onClick={() => setExpand(prevExpand => !prevExpand)}>
        <ListItemText>Network</ListItemText>
        <Adornment edge="end">
          <Icon name="Chevron" size="lg" dir="down" />
        </Adornment>
      </ListItem>
      <AnimatePresence>
        {expand && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <List
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.23)'
              }}
            >
              <ListItem>
                <ListItemText>Binance</ListItemText>
                <Adornment edge="end">
                  <Icon name="CheckFilled" size="lg" />
                </Adornment>
              </ListItem>
              <ListItem>
                <ListItemText>Moonbeam</ListItemText>
                <Adornment edge="end">
                  <Icon name="CheckFilled" size="lg" />
                </Adornment>
              </ListItem>
              <ListItem>
                <ListItemText>Ethereum</ListItemText>
                <Adornment edge="end">
                  <Icon name="CheckFilled" size="lg" />
                </Adornment>
              </ListItem>
            </List>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function HomeNavFilter() {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  function handleHide() {
    setShow(false);
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={handleShow}
      >
        <Icon name="Filter" />
        Filter
      </Button>
      <Modal
        show={show}
        backdrop
        fullScreen
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        exit={{ x: -256 }}
        onHide={handleHide}
      >
        <List
          style={{
            width: 256,
            height: '100%',
            borderRight: '1px solid var(--color-border)',
            backgroundColor: '#191C26'
          }}
        >
          <ListItem>
            <ListItemText>Verified</ListItemText>
            <Adornment edge="end">
              <ToggleSwitch name="verified" onChange={() => {}} />
            </Adornment>
          </ListItem>
          <ListItem>
            <ListItemText>Favorites</ListItemText>
            <Adornment edge="end">
              <ToggleSwitch name="favorites" onChange={() => {}} />
            </Adornment>
          </ListItem>
          <Divider />
          <ListItemNested />
          <Divider />
          <ListItemNested />
        </List>
      </Modal>
    </>
  );
}
