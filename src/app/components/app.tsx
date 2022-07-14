import React from 'react';
import { MuiThemeProvider } from '~/1st-react-ui';
import { NotifyProvider } from '~/1st-react-notify';
import { AppErrorBoundary } from './app-error-boundary';
import { AppSession } from './app-session';

export const App: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <MuiThemeProvider>
      <NotifyProvider>
        <AppErrorBoundary>
          <AppSession>
            {props.children}
          </AppSession>
        </AppErrorBoundary>
      </NotifyProvider>
    </MuiThemeProvider>
  );
};
