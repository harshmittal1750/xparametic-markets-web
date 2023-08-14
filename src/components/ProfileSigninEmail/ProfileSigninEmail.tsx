import cn from 'classnames';

import { Button } from 'components/Button';
import Icon from 'components/Icon';

import profileSigninEmailClasses from './ProfileSigninEmail.module.scss';

export default function ProfileSigninEmail(
  props: Pick<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'>
) {
  return (
    <form {...props}>
      <label
        htmlFor="profile-signin-email"
        className="pm-c-input__group"
        style={{ flexDirection: 'row', gap: 0 }}
      >
        <input
          type="email"
          id="profile-signin-email"
          className="pm-c-input--default"
          placeholder="example@mail.com"
          style={{ width: '100%' }}
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
