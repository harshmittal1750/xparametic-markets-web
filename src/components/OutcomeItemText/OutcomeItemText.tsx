import Icon from 'components/Icon';
import Text from 'components/Text';

import OutcomeItemTextClasses from './OutcomeItemText.module.scss';

export type OutcomeItemTextProps = {
  price: number;
  symbol: string;
  isPositive: boolean;
};

export default function OutcomeItem({
  price,
  symbol,
  isPositive
}: OutcomeItemTextProps) {
  return (
    <>
      <Text
        as="span"
        scale="tiny"
        fontWeight="bold"
        className="pm-c-market-outcomes__item-value"
      >
        {price}
      </Text>{' '}
      {symbol}{' '}
      <Text
        as="span"
        color={isPositive ? 'success' : 'danger'}
        className={OutcomeItemTextClasses.icon}
      >
        <Icon name="Arrow" size="sm" dir={isPositive ? 'up' : 'down'} />
      </Text>
    </>
  );
}
