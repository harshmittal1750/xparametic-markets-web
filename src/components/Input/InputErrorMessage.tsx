/* eslint-disable react/no-array-index-key */
import { RemoveIcon } from 'assets/icons';

import Text from '../Text';

type InputErrorMessageProps = {
  message: string | string[];
};

function InputErrorMessage({ message }: InputErrorMessageProps) {
  return (
    <div className="pm-c-input__error">
      <RemoveIcon />
      {typeof message === 'string' ? (
        <Text
          as="span"
          scale="tiny"
          fontWeight="medium"
          className="pm-c-input__error-message"
        >
          {message}
        </Text>
      ) : (
        <ul>
          {message.map((error, index) => (
            <li key={index}>
              <Text
                as="span"
                scale="tiny"
                fontWeight="medium"
                className="pm-c-input__error-message"
              >
                {error}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputErrorMessage;
