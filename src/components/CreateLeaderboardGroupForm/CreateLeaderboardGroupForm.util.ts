import * as Yup from 'yup';

import type { CreateLeaderboardGroupFormValues } from './CreateLeaderboardGroupForm.type';

const formProps = {
  create: {
    submitTitle: 'Create'
  },
  edit: {
    submitTitle: 'Save changes'
  }
};

function getInitialValues(user: string): CreateLeaderboardGroupFormValues {
  return {
    name: '',
    addresses: user,
    image: {
      file: undefined,
      hash: '',
      isUploaded: false
    }
  };
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.object().shape({
    hash: Yup.string()
  }),
  addresses: Yup.array()
    .transform(function toArray(value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value;
      }
      return originalValue ? originalValue.trim().split('\n') : [];
    })
    .of(
      Yup.string()
        .matches(
          /0[x, X][a-fA-F0-9]{40}/,
          ({ value }) =>
            `${value} should be a valid 42-character address starting with 0x`
        )
        .max(42, ({ value }) => `${value} is too long (max 42-character)`)
    )
    .required('At least one address is required')
});

const sanitizeSubmittedValues = (values: CreateLeaderboardGroupFormValues) => ({
  title: values.name,
  users: values.addresses.trim().split('\n'),
  imageHash: values.image.hash
});

export {
  formProps,
  getInitialValues,
  validationSchema,
  sanitizeSubmittedValues
};
