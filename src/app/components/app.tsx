import React, { useState } from 'react';
import { MuiThemeProvider } from '~/1st-react-ui';

export const App: React.FC<React.PropsWithChildren> = (props) => {
  const [kek, setKek] = useState(1);

  console.log('kek', kek, setKek);

  return (
    <MuiThemeProvider>
      {props.children}
    </MuiThemeProvider>
  );
};
