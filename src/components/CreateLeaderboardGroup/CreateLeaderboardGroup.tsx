import { useCallback, useState } from 'react';

import { Button } from 'components/Button';
import CreateLeaderboardGroupForm from 'components/CreateLeaderboardGroupForm';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';

import CreateLeaderboardGroupClasses from './CreateLeaderboardGroup.module.scss';
import { ariaProps } from './CreateLeaderboardGroup.util';

function CreateLeaderboardGroup() {
  const [show, setShow] = useState(false);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <>
      <Modal
        show={show}
        backdrop
        centered
        className={{ dialog: CreateLeaderboardGroupClasses.modalDialog }}
      >
        <ModalContent className={CreateLeaderboardGroupClasses.modalContent}>
          <ModalHeader>
            <ModalHeaderHide onClick={handleHide} />
            <ModalHeaderTitle id={ariaProps['aria-labelledby']}>
              Create Leaderboard
            </ModalHeaderTitle>
          </ModalHeader>
          <CreateLeaderboardGroupForm />
        </ModalContent>
      </Modal>
      <Button size="sm" variant="normal" color="primary" onClick={handleShow}>
        Create group
      </Button>
    </>
  );
}

export default CreateLeaderboardGroup;
