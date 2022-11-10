/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from 'react';

import { Form, Formik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { Adornment, Divider, List, ListItem, ListItemText, Radio } from 'ui';

import { Button, DateInput, Icon, Modal, ToggleSwitch } from 'components';

const networks = ['Binance', 'Moonbeam', 'Ethereum'];
const endDates = [
  'Any',
  'Ends today',
  'Ends this week',
  'Ends this month',
  'Custom'
];

export default function HomeNavFilter() {
  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState({
    network: false,
    endDate: false
  });
  const [radio, setRadio] = useState({
    network: networks[0],
    endDate: endDates[0]
  });

  function handleExpand(name: string) {
    return () =>
      setExpand(prevExpand => ({
        ...prevExpand,
        [name]: !prevExpand[name]
      }));
  }
  function handleRadio(name: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      setRadio(prevRadio => ({
        ...prevRadio,
        [name]: event.target.value
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
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        exit={{ x: -256 }}
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
                  {networks.map(network => (
                    <ListItem key={network}>
                      <ListItemText>{network}</ListItemText>
                      <Adornment edge="end">
                        <Radio
                          checked={network === radio.network}
                          value={network}
                          onChange={handleRadio('network')}
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
                  {endDates.map(endDate => (
                    <Fragment key={endDate}>
                      <ListItem>
                        <ListItemText>{endDate}</ListItemText>
                        <Adornment edge="end">
                          <Radio
                            checked={endDate === radio.endDate}
                            value={endDate}
                            onChange={handleRadio('endDate')}
                          />
                        </Adornment>
                      </ListItem>
                      {endDate === 'Custom' && (
                        <ListItem>
                          <Formik
                            onSubmit={() => {}}
                            initialValues={{
                              start: '',
                              end: ''
                            }}
                          >
                            <Form
                              style={{
                                display: 'flex',
                                gap: 12,
                                alignItems: 'center',
                                marginBottom: 12
                              }}
                            >
                              <DateInput name="start" format="DD/MM/YYYY" />
                              to
                              <DateInput name="end" format="DD/MM/YYYY" />
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
