import * as React from 'react';

declare module 'react' {
  export interface PropsWithChildrenElement {
    children: React.ReactElement;
  }
}
