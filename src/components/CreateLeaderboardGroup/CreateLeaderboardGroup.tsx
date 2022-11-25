import { useCallback, useState } from 'react';

import type { CreateLeaderboardGroupState } from 'pages/Leaderboard/types';

import { Button } from 'components/Button';
import CreateLeaderboardGroupForm from 'components/CreateLeaderboardGroupForm';
import Link from 'components/Link';
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
  disabled?: boolean;
};

function CreateLeaderboardGroup({
  mode,
  previousValues,
  slug,
  disabled
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
            <p className="tiny medium text-2 margin-top-3">
              {`Need help? Check out the `}
              <Link
                title="docs"
                scale="tiny"
                fontWeight="medium"
                href="https://ifl.polkamarkets.com/docs/group-leaderboards"
                target="_blank"
              />
            </p>
          </ModalHeader>
          <CreateLeaderboardGroupForm
            mode={mode}
            previousValues={previousValues}
            slug={slug}
            onHide={handleHide}
          />
        </ModalContent>
      </Modal>
      <Button
        size="sm"
        variant="normal"
        color="primary"
        onClick={handleShow}
        disabled={disabled}
      >
        {formProps[mode].actionTitle}
      </Button>
    </>
  );
}

export default CreateLeaderboardGroup;
