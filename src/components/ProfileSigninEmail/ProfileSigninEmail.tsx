import cn from 'classnames';

import { Button } from 'components/Button';
import Icon from 'components/Icon';

import profileSigninEmailClasses from './ProfileSigninEmail.module.scss';

export default function ProfileSigninEmail(
  props: Pick<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'>
) {
  return (
    <form {...props}>
      <label htmlFor="profile-signin-email" className="pm-c-input__group">
        <input
          type="email"
          id="profile-signin-email"
          className="pm-c-input--default"
          placeholder="example@mail.com"
        />
        <Button
          type="submit"
          variant="normal"
          className={cn(profileSigninEmailClasses.email)}
        >
          <Icon size="lg" name="LogIn" />
        </Button>
      </label>
    </form>
  );
}
