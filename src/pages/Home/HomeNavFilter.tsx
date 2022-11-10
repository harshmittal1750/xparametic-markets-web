/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from 'react';

import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { Adornment, Divider, List, ListItem, ListItemText, Toggle } from 'ui';

import { Button, DateInput, Icon, Modal, ToggleSwitch } from 'components';

export default function HomeNavFilter() {
  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState({
    network: false,
    endDate: false
  });
  const [toggle, setToggle] = useState({
    network: {
      Binance: false,
      Moonbeam: false,
      Ethereum: false
    },
    endDate: {
      Any: false,
      'Ends today': false,
      'Ends this week': false,
      'Ends this month': false,
      Custom: false
    }
  });

  function handleExpand(name: string) {
    return () =>
      setExpand(prevExpand => ({
        ...prevExpand,
        [name]: !prevExpand[name]
      }));
  }
  function handleToggle(name: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      setToggle(prevToggle => ({
        ...prevToggle,
        [name]: {
          ...prevToggle[name],
          [event.target.name]: event.target.checked
        }
      }));
  }
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
        initial={{ x: -304 }}
        animate={{ x: 0 }}
        exit={{ x: -304 }}
        // onHide={handleHide}
      >
        <List
          style={{
            width: 304,
            height: '100%',
            borderRight: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)'
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
          <ListItem onClick={handleExpand('network')}>
            <ListItemText>Network</ListItemText>
            <Adornment edge="end">
              <Icon
                name="Chevron"
                size="lg"
                dir={expand.network ? 'up' : 'down'}
              />
            </Adornment>
          </ListItem>
          <AnimatePresence>
            {expand.network && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <List
                  style={{
                    backgroundColor: 'var(--color-background-primary)'
                  }}
                >
                  {Object.keys(toggle.network).map(network => (
                    <ListItem key={network}>
                      <ListItemText>{network}</ListItemText>
                      <Adornment edge="end">
                        <Toggle
                          type="checkbox"
                          checked={toggle.network[network]}
                          value={network}
                          name={network}
                          onChange={handleToggle('network')}
                        />
                      </Adornment>
                    </ListItem>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
          <Divider />
          <ListItem onClick={handleExpand('endDate')}>
            <ListItemText>End Date</ListItemText>
            <Adornment edge="end">
              <Icon
                name="Chevron"
                size="lg"
                dir={expand.endDate ? 'up' : 'down'}
              />
            </Adornment>
          </ListItem>
          <AnimatePresence>
            {expand.endDate && (
              <motion.div
                style={{ overflow: 'hidden' }}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
              >
                <List
                  style={{
                    backgroundColor: 'var(--color-background-primary)'
                  }}
                >
                  {Object.keys(toggle.endDate).map(endDate => (
                    <Fragment key={endDate}>
                      <ListItem>
                        <ListItemText>{endDate}</ListItemText>
                        <Adornment edge="end">
                          <Toggle
                            type="checkbox"
                            checked={toggle.endDate[endDate]}
                            value={endDate}
                            name={endDate}
                            onChange={handleToggle('endDate')}
                          />
                        </Adornment>
                      </ListItem>
                      {endDate === 'Custom' && (
                        <ListItem>
                          <Formik
                            onSubmit={() => {}}
                            initialValues={{
                              start: null,
                              end: null
                            }}
                          >
                            <Form
                              style={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'center',
                                marginBottom: 12,
                                marginRight: -12,
                                marginLeft: -12
                              }}
                            >
                              <DateInput
                                name="start"
                                emptyLabel="Start"
                                format="DD/MM/YYYY"
                              />
                              to
                              <DateInput
                                name="end"
                                emptyLabel="End"
                                format="DD/MM/YYYY"
                              />
                            </Form>
                          </Formik>
                        </ListItem>
                      )}
                    </Fragment>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
        </List>
      </Modal>
    </>
  );
}
