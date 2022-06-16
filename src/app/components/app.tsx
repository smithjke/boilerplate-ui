import React from 'react';
import { MuiThemeProvider } from '~/1st-react-ui';
import { NotifyProvider } from '~/1st-react-notify';
import { AppSession } from './app-session';

export const App: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <MuiThemeProvider>
      <NotifyProvider>
        <AppSession>
          {props.children}
        </AppSession>
      </NotifyProvider>
    </MuiThemeProvider>
  );
};
