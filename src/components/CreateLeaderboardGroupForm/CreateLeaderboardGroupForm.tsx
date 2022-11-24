import { Formik, Form } from 'formik';

import { Button } from 'components/Button';
import { Input, TextArea } from 'components/Input';
import ModalFooter from 'components/ModalFooter';

import CreateLeaderboardGroupFormClasses from './CreateLeaderboardGroupForm.module.scss';
import {
  initialValues,
  validationSchema
} from './CreateLeaderboardGroupForm.util';

function CreateLeaderboardGroupForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {}}
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
          >
            Create
          </Button>
        </ModalFooter>
      </Form>
    </Formik>
  );
}

export default CreateLeaderboardGroupForm;
