import { useCallback, useState } from 'react';

import type { CreateLeaderboardGroupState } from 'pages/Leaderboard/types';

import { Button } from 'components/Button';
import CreateLeaderboardGroupForm from 'components/CreateLeaderboardGroupForm';
import Modal from 'components/Modal';
import ModalContent from 'components/ModalContent';
import ModalHeader from 'components/ModalHeader';
import ModalHeaderHide from 'components/ModalHeaderHide';
import ModalHeaderTitle from 'components/ModalHeaderTitle';

import CreateLeaderboardGroupClasses from './CreateLeaderboardGroup.module.scss';
import { ariaProps, formProps } from './CreateLeaderboardGroup.util';

type CreateLeaderboardGroupProps = {
  mode: CreateLeaderboardGroupState['mode'];
  previousValues?: CreateLeaderboardGroupState['previousValues'];
  slug?: string;
};

function CreateLeaderboardGroup({
  mode,
  previousValues,
  slug
}: CreateLeaderboardGroupProps) {
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
              {formProps[mode].title}
            </ModalHeaderTitle>
          </ModalHeader>
          <CreateLeaderboardGroupForm
            mode={mode}
            previousValues={previousValues}
            slug={slug}
            onHide={handleHide}
          />
        </ModalContent>
      </Modal>
      <Button size="sm" variant="normal" color="primary" onClick={handleShow}>
        {formProps[mode].actionTitle}
      </Button>
    </>
  );
}

export default CreateLeaderboardGroup;
