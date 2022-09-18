import cn from 'classnames';

// eslint-disable-next-line import/prefer-default-export
export function renderClassName({ withClassName }: { withClassName: string }) {
  const input = cn('class', {
    name: true
  });

  return {
    input,
    expected: `${withClassName} ${input}`
  };
}
