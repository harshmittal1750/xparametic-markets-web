import cn from 'classnames';
import { kebabCase, uniqueId } from 'lodash';
import { Line } from 'rc-progress';
import { useMedia } from 'ui';

import { Area } from 'components/plots';
import type { AreaDataPoint } from 'components/plots/Area/Area.type';
import Text from 'components/Text';

import OutcomeItemClasses from './OutcomeItem.module.scss';

export type OutcomeProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'onClick' | 'children' | 'value'
> &
  Partial<Record<'primary', string>> &
  Partial<
    Record<
      'isActive' | 'isPositive' | 'isResolved' | 'isWinning' | '$gutterBottom',
      boolean
    >
  > &
  Partial<Record<'endAdornment' | 'secondary', React.ReactNode>> & {
    percent?: number;
    data?: AreaDataPoint[];
    $variant?: 'dashed';
  };

export default function OutcomeItem({
  primary,
  secondary,
  percent,
  isActive,
  isPositive,
  isResolved,
  isWinning,
  endAdornment,
  children,
  $gutterBottom,
  data,
  $variant,
  ...props
}: OutcomeProps) {
  const isTablet = useMedia('(min-width: 512px)');

  return (
    <button
      type="button"
      className={cn(OutcomeItemClasses.root, {
        'pm-c-market-outcomes__item--default': !isResolved,
        'pm-c-market-outcomes__item--success': isWinning,
        'pm-c-market-outcomes__item--danger': !isWinning,
        [OutcomeItemClasses.gutterBottom]: $gutterBottom,
        [OutcomeItemClasses.variantDashed]: $variant === 'dashed',
        active: isActive
      })}
      disabled={isResolved}
      {...props}
    >
      <div className={OutcomeItemClasses.content}>
        <div className="pm-c-market-outcomes__item-group--column">
          <Text
            as="p"
            scale="caption"
            fontWeight="semibold"
            className="pm-c-market-outcomes__item-title"
          >
            {primary}
          </Text>
          <Text
            as="p"
            scale="tiny"
            fontWeight="semibold"
            className="pm-c-market-outcomes__item-odd"
          >
            {secondary}
          </Text>
        </div>
        <div className="pm-c-market-outcomes__item-endAdornment">
          {endAdornment ||
            (data && isTablet && (
              <Area
                id={`${kebabCase(primary)}-${uniqueId('outcome-item')}`}
                data={data}
                color={isPositive ? 'green' : 'red'}
                width={48}
                height={32}
              />
            ))}
        </div>
      </div>
      {isTablet && children}
      {!isResolved && percent && (
        <Line
          percent={percent}
          strokeWidth={1}
          strokeColor={(() => {
            if (isPositive) return '#65D6AD';
            if (!data) return 'var(--color-text-secondary)';
            return '#F86A6A';
          })()}
          trailWidth={1}
          trailColor="var(--color-vote-arrows-background--neutral)"
          strokeLinecap="butt"
          className={OutcomeItemClasses.line}
        />
      )}
    </button>
  );
}
