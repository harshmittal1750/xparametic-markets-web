import { PolkamarketsIcon } from 'assets/icons';

import {
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalSectionText,
  Text
} from 'components';

import { InitActions, InitState } from 'hooks/useInit';

export default function Init({ type, message, fetch }: InitState) {
  const data = {
    [InitActions.RESTRICTED]: {
      heading: 'Polkamarkets is not available in your country',
      body: (
        <>
          <ModalSectionText>
            At the moment Polkamarkets Services and POLK Token (POLK) are not
            available in{' '}
            <Link
              href="https://www.polkamarkets.com/legal/terms-conditions"
              title="Excluded Jurisdictions."
              scale="body"
              fontWeight="medium"
              className="text-gray"
              target="_blank"
            />
          </ModalSectionText>
          <ModalSectionText>
            For further information please contact us on{' '}
            <Link
              href="mailto:general@polkamarkets.com"
              title="general@polkamarkets.com"
              scale="body"
              fontWeight="medium"
              className="text-gray"
              target="_blank"
            />
          </ModalSectionText>
        </>
      ),
      label: 'Learn More'
    },
    [InitActions.ERROR]: {
      heading: 'Oops! Something went wrong.',
      body: <ModalSectionText>{message}</ModalSectionText>,
      label: 'Try Again'
    }
  }[type];

  return (
    <div className="pm-restricted-country">
      <Modal show centered size="sm">
        <ModalContent className="ta-center">
          <ModalHeader>
            <PolkamarketsIcon />
            <Text
              as="h5"
              scale="heading"
              fontWeight="bold"
              className="t-primary"
            >
              {data.heading}
            </Text>
          </ModalHeader>
          <ModalSection>{data.body}</ModalSection>
          <ModalFooter>
            <a
              style={{ margin: '0 auto', color: 'rgb(158 158 255)' }}
              className="pm-c-button-normal--primary pm-c-button--sm"
              {...(type === InitActions.RESTRICTED
                ? {
                    href: 'https://help.polkamarkets.com/en/articles/5623718-ownership-architecture',
                    target: '_blank',
                    rel: 'noreferrer'
                  }
                : {
                    onClick: fetch
                  })}
            >
              {data.label}
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
