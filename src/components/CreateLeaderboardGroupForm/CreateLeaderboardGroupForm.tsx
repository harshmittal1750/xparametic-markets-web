import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Formik, Form } from 'formik';
import {
  useCreateLeaderboardGroupMutation,
  useEditLeaderboardGroupMutation
} from 'services/Polkamarkets';

import type { CreateLeaderboardGroupState } from 'pages/Leaderboard/types';

import { Button } from 'components/Button';
import { Input, TextArea } from 'components/Input';
import ModalFooter from 'components/ModalFooter';

import { useAppSelector } from 'hooks';

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
  onHide: () => void;
};

function CreateLeaderboardGroupForm({
  mode,
  previousValues,
  slug,
  onHide
}: CreateLeaderboardGroupFormProps) {
  const history = useHistory();
  const userEthAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const [
    createLeaderboardGroup,
    { data: createLeaderboardGroupData, isSuccess: isSuccessCreate }
  ] = useCreateLeaderboardGroupMutation();

  const [
    editLeaderboardGroup,
    { data: editLeaderboardGroupData, isSuccess: isSuccessEdit }
  ] = useEditLeaderboardGroupMutation();

  const redirectToLeaderboardGroup = useCallback(
    (leaderboardSlug: string) => {
      history.push(`/leaderboard/${leaderboardSlug}?m=f`);
      window.location.reload();
    },
    [history]
  );

  useEffect(() => {
    if (isSuccessCreate && createLeaderboardGroupData) {
      onHide();
      redirectToLeaderboardGroup(createLeaderboardGroupData.slug);
    }

    if (isSuccessEdit && editLeaderboardGroupData) {
      onHide();
      redirectToLeaderboardGroup(editLeaderboardGroupData.slug);
    }
  }, [
    createLeaderboardGroupData,
    editLeaderboardGroupData,
    history,
    isSuccessCreate,
    isSuccessEdit,
    onHide,
    redirectToLeaderboardGroup
  ]);

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
    async (values: CreateLeaderboardGroupFormValues) => {
      const sanitizedValues = sanitizeSubmittedValues(values);
      if (mode === 'create') {
        await handleCreate(sanitizedValues);
      } else if (mode === 'edit') {
        await handleEdit(sanitizedValues);
      }
    },
    [handleCreate, handleEdit, mode]
  );

  return (
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
            className={CreateLeaderboardGroupFormClasses.textarea}
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
  );
}

export default CreateLeaderboardGroupForm;
