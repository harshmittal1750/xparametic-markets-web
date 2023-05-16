import Icon from 'components/Icon';
import Text from 'components/Text';

import outcomeItemTextClasses from './OutcomeItemText.module.scss';

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
    <Text as="p" scale="tiny" fontWeight="semibold">
      <strong>{price}</strong>{' '}
      <span className={outcomeItemTextClasses.tick}>{symbol}</span>{' '}
      <Text
        as="span"
        color={isPositive ? 'success' : 'danger'}
        className={outcomeItemTextClasses.icon}
      >
        <Icon name="Arrow" size="sm" dir={isPositive ? 'up' : 'down'} />
      </Text>
    </Text>
  );
}
