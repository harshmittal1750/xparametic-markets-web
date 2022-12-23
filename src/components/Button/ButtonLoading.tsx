import { useRect } from 'ui';

import Button, { ButtonProps } from './Button';

/**
 * Button to trigger an operation
 */
export default function ButtonLoading({
  loading,
  children,
  ...props
}: ButtonProps & { loading: boolean }) {
  const [ref, rect] = useRect<HTMLButtonElement>();

  return (
    <Button
      ref={ref}
      {...(loading && {
        width: `${rect?.width}px`,
        height: `${rect?.height}px`
      })}
      {...props}
    >
      {loading ? <span className="spinner" /> : children}
    </Button>
  );
}
