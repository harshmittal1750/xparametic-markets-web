import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { closeRightSidebar } from 'redux/ducks/ui';

import { Button } from 'components/Button';
import type { ButtonProps } from 'components/Button';

import { useAppDispatch } from 'hooks';

export default function CreateMarket(props: ButtonProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const handleNavigateToCreateMarket = useCallback(() => {
    dispatch(closeRightSidebar());
    history.push('/market/create');
  }, [dispatch, history]);

  return (
    <Button
      color="primary"
      size="sm"
      onClick={handleNavigateToCreateMarket}
      {...props}
    >
      Create Market
    </Button>
  );
}
