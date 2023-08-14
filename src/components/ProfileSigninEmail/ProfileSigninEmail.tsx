import cn from 'classnames';

import { Button } from 'components/Button';
import Icon from 'components/Icon';

import profileSigninEmailClasses from './ProfileSigninEmail.module.scss';

export default function ProfileSigninEmail(
  props: Pick<React.ComponentPropsWithoutRef<'form'>, 'onSubmit'>
) {
  return (
    <form className={profileSigninEmailClasses.root} {...props}>
      <input
        type="email"
        className={profileSigninEmailClasses.input}
        placeholder="Enter your e-mail"
      />
      <Button
        type="submit"
        variant="normal"
        size="xs"
        className={cn(profileSigninEmailClasses.email)}
      >
        <Icon size="lg" name="LogIn" />
      </Button>
    </form>
  );
}
