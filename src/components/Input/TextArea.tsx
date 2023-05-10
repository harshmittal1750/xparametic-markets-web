import { forwardRef, TextareaHTMLAttributes } from 'react';

import cn from 'classnames';
import { useField } from 'formik';

import InputErrorMessage from './InputErrorMessage';

type TextAreaProps = {
  label?: string;
  name: string;
  description?: string;
  required?: boolean;
};

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(
  (
    { label, name, description, className, required = false, ...props },
    ref
  ) => {
    const [field, meta] = useField(name);

    const hasError = meta.touched && meta.error;

    return (
      <div className="pm-c-input__group">
        {!!label && (
          <label
            htmlFor={name}
            className={cn({
              'pm-c-input__label--error': hasError,
              'pm-c-input__label--default': !hasError,
              'pm-c-input__label--required': required
            })}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            {
              'pm-c-input--error': hasError,
              'pm-c-input--default': !hasError
            },
            className
          )}
          id={name}
          {...field}
          {...props}
        />
        {hasError && meta.error ? (
          <InputErrorMessage message={meta.error} />
        ) : null}
        {description && !hasError ? (
          <span className="pm-c-input__description">{description}</span>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
