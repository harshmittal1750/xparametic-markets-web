import React from 'react';

export type ListenerFocustrapProps<
  T extends React.ElementType<any> = React.ElementType<any>
> = React.ComponentPropsWithRef<T>;
