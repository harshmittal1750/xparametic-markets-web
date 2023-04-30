import { Button, Logos, Text } from 'components';

import profileClasses from './Profile.module.scss';

export default function ProfileError() {
  return (
    <div className={profileClasses.container}>
      <Logos size="lg" standard="mono" />
      <Text color="gray">Something went wrong. Please, try again!</Text>
      <Button
        size="xs"
        color="primary"
        className={profileClasses.containerButton}
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
}
