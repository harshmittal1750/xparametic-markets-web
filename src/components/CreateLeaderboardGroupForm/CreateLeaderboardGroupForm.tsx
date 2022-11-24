import { useCallback, useEffect } from 'react';

import { Formik, Form, FormikHelpers } from 'formik';
import {
  useCreateLeaderboardGroupMutation,
  useEditLeaderboardGroupMutation
} from 'services/Polkamarkets';

import type { CreateLeaderboardGroupState } from 'pages/Leaderboard/types';

import { Button } from 'components/Button';
import { Input, TextArea } from 'components/Input';
import ModalFooter from 'components/ModalFooter';
import Toast from 'components/Toast';
import ToastNotification from 'components/ToastNotification';

import { useAppSelector } from 'hooks';
import useToastNotification from 'hooks/useToastNotification';

import CreateLeaderboardGroupFormClasses from './CreateLeaderboardGroupForm.module.scss';
import type { CreateLeaderboardGroupFormValues } from './CreateLeaderboardGroupForm.type';
import {
  formProps,
  initialValues,
  sanitizeSubmittedValues,
  validationSchema
} from './CreateLeaderboardGroupForm.util';

type CreateLeaderboardGroupFormProps = {
  mode: CreateLeaderboardGroupState['mode'];
  previousValues?: CreateLeaderboardGroupFormValues;
  slug?: string;
};

function CreateLeaderboardGroupForm({
  mode,
  previousValues,
  slug
}: CreateLeaderboardGroupFormProps) {
  const userEthAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const { show: showToastNotification, close: closeToastNotification } =
    useToastNotification();

  const [createLeaderboardGroup, { isSuccess: isSuccessCreate }] =
    useCreateLeaderboardGroupMutation();

  const [editLeaderboardGroup, { isSuccess: isSuccessEdit }] =
    useEditLeaderboardGroupMutation();

  useEffect(() => {
    if (isSuccessCreate) {
      showToastNotification('leaderboard-group--create');
    }

    if (isSuccessEdit) {
      showToastNotification('leaderboard-group--edit');
    }
  }, [isSuccessCreate, isSuccessEdit, showToastNotification]);

  const handleCreate = useCallback(
    async values => {
      await createLeaderboardGroup({
        ...values,
        createdBy: userEthAddress
      });
    },
    [createLeaderboardGroup, userEthAddress]
  );

  const handleEdit = useCallback(
    async values => {
      await editLeaderboardGroup({
        ...values,
        slug
      });
    },
    [editLeaderboardGroup, slug]
  );

  const handleSubmit = useCallback(
    async (
      values: CreateLeaderboardGroupFormValues,
      actions: FormikHelpers<CreateLeaderboardGroupFormValues>
    ) => {
      const sanitizedValues = sanitizeSubmittedValues(values);
      if (mode === 'create') {
        await handleCreate(sanitizedValues);
      } else if (mode === 'edit') {
        await handleEdit({
          ...sanitizedValues
        });
      }
    },
    [handleCreate, handleEdit, mode]
  );

  return (
    <>
      <ToastNotification id={`leaderboard-group--${mode}`} duration={10000}>
        <Toast
          variant="success"
          title="Success"
          description={formProps[mode].successNotificationDescription}
        >
          <Toast.Actions>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                closeToastNotification(`leaderboard-group--${mode}`)
              }
            >
              Dismiss
            </Button>
          </Toast.Actions>
        </Toast>
      </ToastNotification>
      <Formik
        initialValues={previousValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className={CreateLeaderboardGroupFormClasses.form}>
            <Input
              name="name"
              label="Name"
              placeholder="Leaderboard name"
              disabled={isSubmitting}
            />
            <TextArea
              name="addresses"
              label="Addresses"
              placeholder="Addresses (one per line)"
              rows={8}
              disabled={isSubmitting}
            />
            <ModalFooter>
              <Button
                type="submit"
                size="sm"
                variant="normal"
                color="primary"
                fullwidth
                disabled={!dirty || !isValid || isSubmitting}
                loading={isSubmitting}
              >
                {formProps[mode].submitTitle}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreateLeaderboardGroupForm;
