import cn from 'classnames';
import { kebabCase, uniqueId } from 'lodash';
import { Line } from 'rc-progress';
import { Avatar, useTheme } from 'ui';

import { Area } from 'components/plots';
import type { AreaDataPoint } from 'components/plots/Area/Area.type';
import Text from 'components/Text';

import outcomeItemClasses from './OutcomeItem.module.scss';

export type OutcomeProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'onClick' | 'children' | 'value'
> &
  Partial<Record<'primary' | 'image', string>> &
  Partial<
    Record<
      'isActive' | 'isPositive' | 'isResolved' | 'isWinning' | '$gutterBottom',
      boolean
    >
  > &
  Partial<Record<'itemEnd' | 'secondary', React.ReactNode>> & {
    percent?: number;
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
  itemEnd,
  children,
  $gutterBottom,
  $size,
  data,
  $variant,
  image,
  ...props
}: OutcomeProps) {
  const theme = useTheme();

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
        [outcomeItemClasses.backdrop]: !itemEnd && image,
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
          <div>
            <Avatar $size="xs" $radius="xs" src={image} />
          </div>
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
          {secondary}
        </div>
        <div className="pm-c-market-outcomes__item-itemEnd">
          {(() => {
            if (itemEnd) return itemEnd;
            if (image && $size === 'sm')
              return <Avatar $size="xs" $radius="xs" src={image} />;
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
      {theme.device.isTablet && children}
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
