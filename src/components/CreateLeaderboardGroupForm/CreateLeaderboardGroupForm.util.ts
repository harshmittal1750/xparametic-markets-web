import * as Yup from 'yup';

import type { CreateLeaderboardGroupFormValues } from './CreateLeaderboardGroupForm.type';

const initialValues: CreateLeaderboardGroupFormValues = {
  name: '',
  addresses: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
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

export { initialValues, validationSchema };
