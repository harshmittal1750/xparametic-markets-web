import { useCallback, useState } from 'react';

import { Button, ButtonProps } from 'components/Button';
import ModalSectionText from 'components/ModalSectionText';

export default function ProfileSigninEmail(
  props: Pick<ButtonProps, 'onClick' | 'name'>
) {
  const [email, setEmail] = useState('');
  const handleEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(event.target.value),
    []
  );

  return (
    <>
      <ModalSectionText>
        <hr
          style={{
            marginTop: '2rem',
            border: 'none',
            borderBottom: '0.1rem solid white'
          }}
        />
      </ModalSectionText>
      <ModalSectionText>
        <form>
          <div className="pm-c-input__group">
            <input
              className="pm-c-input--default"
              id="email"
              value={email}
              placeholder="Write your email here"
              onChange={handleEmail}
            />
          </div>
        </form>
        <Button
          style={{ marginTop: '1rem' }}
          color="default"
          size="sm"
          disabled={!email}
          data-email={email}
          {...props}
        >
          Email
        </Button>
      </ModalSectionText>
    </>
  );
}
