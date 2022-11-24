import { useCallback } from 'react';

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
};

function CreateLeaderboardGroupForm({
  mode,
  previousValues,
  slug
}: CreateLeaderboardGroupFormProps) {
  const userEthAddress = useAppSelector(state => state.polkamarkets.ethAddress);

  const [createLeaderboardGroup, { isLoading: isCreating }] =
    useCreateLeaderboardGroupMutation();

  const [editLeaderboardGroup, { isLoading: isEditing }] =
    useEditLeaderboardGroupMutation();

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
        await handleEdit({
          ...sanitizedValues
        });
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
      <Form className={CreateLeaderboardGroupFormClasses.form}>
        <Input name="name" label="Name" placeholder="Leaderboard name" />
        <TextArea
          name="addresses"
          label="Addresses"
          placeholder="Addresses (one per line)"
          rows={8}
        />
        <ModalFooter>
          <Button
            type="submit"
            size="sm"
            variant="normal"
            color="primary"
            fullwidth
            loading={isCreating || isEditing}
          >
            {formProps[mode].submitTitle}
          </Button>
        </ModalFooter>
      </Form>
    </Formik>
  );
}

export default CreateLeaderboardGroupForm;
