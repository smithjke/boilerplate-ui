import React from 'react';
import { BaseLayout } from '~/1st-react-ui';
import { AppHeader } from '~/app';
import { AppSidebar } from '~/app/components/app-sidebar';

export const AppLayout: React.FC<React.PropsWithChildren> = (props) => (
  <BaseLayout
    header={(
      <AppHeader/>
    )}
    sidebar={(
      <AppSidebar/>
    )}
  >
    {props.children}
  </BaseLayout>
);
