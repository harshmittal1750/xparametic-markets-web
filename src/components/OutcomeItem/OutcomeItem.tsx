import { useMemo } from 'react';

import cn from 'classnames';
import { kebabCase, uniqueId } from 'lodash';
import { Line } from 'rc-progress';
import { Avatar, useTheme } from 'ui';

import { CheckIcon, RemoveIcon, RepeatCycleIcon } from 'assets/icons';

import MiniTable from 'components/MiniTable';
import { Area } from 'components/plots';
import type { AreaDataPoint } from 'components/plots/Area/Area.type';
import Text from 'components/Text';

import outcomeItemClasses from './OutcomeItem.module.scss';

export type OutcomeProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'onClick' | 'children' | 'value'
> &
  Partial<
    Record<
      | 'isActive'
      | 'isPositive'
      | 'isResolved'
      | 'isWinning'
      | 'isVoided'
      | '$gutterBottom',
      boolean
    >
  > &
  Partial<Record<'primary' | 'image', string>> &
  Partial<Record<'endAdornment' | 'secondary', React.ReactNode>> &
  Partial<Record<'shares' | 'percent', number>> & {
    data?: AreaDataPoint[];
    $variant?: 'dashed';
    $size?: 'sm' | 'md';
  };

export default function OutcomeItem({
  primary,
  secondary,
  percent,
  isActive,
  isPositive,
  isResolved,
  isWinning,
  isVoided,
  endAdornment,
  shares,
  $gutterBottom,
  $size,
  data,
  $variant,
  image,
  ...props
}: OutcomeProps) {
  const theme = useTheme();
  const avatar = useMemo(
    () => <Avatar $size="xs" $radius="xs" src={image} />,
    [image]
  );

  return (
    <button
      type="button"
      disabled={isResolved}
      className={cn(outcomeItemClasses.root, {
        'pm-c-market-outcomes__item--default': !isResolved,
        'pm-c-market-outcomes__item--success': isWinning,
        'pm-c-market-outcomes__item--danger': !isWinning,
        [outcomeItemClasses.gutterBottom]: $gutterBottom,
        [outcomeItemClasses.variantDashed]: $variant === 'dashed',
        [outcomeItemClasses.backdrop]: !endAdornment && image,
        active: isActive
      })}
      style={{
        // @ts-expect-error No need to assert React.CSSProperties here
        '--outcome-image': image && `url('${image}')`
      }}
      {...props}
    >
      <div className={outcomeItemClasses.content}>
        {image && $size === 'md' && (
          <div className={outcomeItemClasses.itemStart}>{avatar}</div>
        )}
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
            className={`pm-c-market-outcomes__item-odd ${outcomeItemClasses.secondary}`}
          >
            {secondary}
          </Text>
        </div>
        <div className={outcomeItemClasses.itemEnd}>
          {(() => {
            if (isResolved)
              return (
                <div className="pm-c-market-outcomes__item-result">
                  {(() => {
                    if (isVoided) return <RepeatCycleIcon />;
                    if (isWinning) return <CheckIcon />;
                    return <RemoveIcon />;
                  })()}
                </div>
              );
            if (image && $size === 'sm') return avatar;
            if (data && theme.device.isTablet)
              return (
                <Area
                  id={`${kebabCase(primary)}-${uniqueId('outcome-item')}`}
                  data={data}
                  color={isPositive ? 'green' : 'red'}
                  width={48}
                  height={32}
                />
              );
            return null;
          })()}
        </div>
      </div>
      {theme.device.isTablet && $size === 'md' && (
        <MiniTable
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 8
          }}
          rows={[
            {
              key: 'invested',
              title: 'your shares',
              value: shares || 0
            }
          ]}
        />
      )}
      {!isResolved && typeof percent !== 'undefined' && (
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
          className={outcomeItemClasses.line}
        />
      )}
    </button>
  );
}
