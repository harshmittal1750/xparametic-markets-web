import cn from 'classnames';
import { Line } from 'rc-progress';

import Icon from 'components/Icon';
import Text from 'components/Text';

export type OutcomeProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'disabled' | 'onClick' | 'children' | 'value'
> &
  Record<'title' | 'price' | 'currency', string> &
  Partial<
    Record<'isActive' | 'isPositive' | 'isResolved' | 'isWinning', boolean>
  > & {
    chart: React.ReactNode;
  };

export default function OutcomeItem({
  title,
  price,
  currency,
  isActive,
  isPositive,
  isResolved,
  isWinning,
  chart,
  children,
  ...props
}: OutcomeProps) {
  return (
    <button
      style={{
        flexFlow: 'column nowrap',
        padding: 0,
        gap: 0,
        alignItems: 'stretch',
        overflowX: 'hidden',
        width: '100%'
      }}
      type="button"
      className={cn('pm-c-market-outcomes__item', {
        'pm-c-market-outcomes__item--default': !isResolved,
        'pm-c-market-outcomes__item--success': isWinning,
        'pm-c-market-outcomes__item--danger': !isWinning,
        active: isActive
      })}
      {...props}
    >
      <div
        style={{
          padding: '16px 16px 8px 16px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="pm-c-market-outcomes__item-group--column">
          <Text
            as="p"
            scale="caption"
            fontWeight="semibold"
            className="pm-c-market-outcomes__item-title"
          >
            {title}
          </Text>
          <Text
            as="span"
            scale="tiny"
            fontWeight="bold"
            className="pm-c-market-outcomes__item-value"
          >
            {price}
            <span className="pm-c-market-outcomes__item-odd"> {currency} </span>
            {!isResolved && (
              <Text as="span" color={isPositive ? 'success' : 'danger'}>
                <Icon name="Arrow" size="sm" dir={isPositive ? 'up' : 'down'} />
              </Text>
            )}
          </Text>
        </div>
        <div className="pm-c-market-outcomes__item-chart">{chart}</div>
      </div>
      {children}
      {!isResolved && (
        <Line
          percent={+price * 100}
          strokeWidth={1}
          strokeColor={isPositive ? '#65D6AD' : '#F86A6A'}
          trailWidth={1}
          trailColor="var(--color-vote-arrows-background--neutral)"
          strokeLinecap="butt"
        />
      )}
    </button>
  );
}
