import { useCallback, useState } from 'react';

import cn from 'classnames';

import { Button } from 'components/Button';
import type { ButtonProps } from 'components/Button';

import profileSigninEmailClasses from './ProfileSigninEmail.module.scss';

export default function ProfileSigninEmail({
  className,
  ...props
}: Pick<ButtonProps, 'onClick' | 'name' | 'children' | 'className'>) {
  const [email, setEmail] = useState('');
  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(event.target.value),
    []
  );

  return (
    <>
      <label htmlFor="profile-signin-email" className="pm-c-input__group">
        <input
          type="email"
          id="profile-signin-email"
          className="pm-c-input--default"
          placeholder="Write your email here"
          onChange={handleEmail}
        />
        <Button
          disabled={!email}
          data-email={email}
          className={cn(profileSigninEmailClasses.email, className)}
          {...props}
          variant="normal"
        />
      </label>
    </>
  );
}
