import React from 'react';
import { BaseLayout } from '~/1st-react-ui';

export const AppLayout: React.FC<React.PropsWithChildren> = (props) => (
  <BaseLayout>
    {props.children}
  </BaseLayout>
);
