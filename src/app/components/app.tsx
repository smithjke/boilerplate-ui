import React from 'react';
import { MuiThemeProvider } from '~/1st-react-ui';
import { AppSession } from './app-session';
import { NotifyProvider, useNotifyService } from '~/notify';

export const App: React.FC<React.PropsWithChildren> = (props) => {
  const notifyService = useNotifyService();

  return (
    <MuiThemeProvider>
      <NotifyProvider notifyService={notifyService}>
        <AppSession>
          {props.children}
        </AppSession>
      </NotifyProvider>
    </MuiThemeProvider>
  );
};
