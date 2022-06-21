import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#64982d',
    // },
  },
});

export const MuiThemeProvider: React.FC<React.PropsWithChildren> = (props) => (
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles
      styles={{
        img: { display: 'block', maxWidth: '100%' },
        svg: { display: 'block' },
        body: {
          backgroundColor: '#e0e5ea',
          color: '#333333',
          margin: 0,
          padding: 0,
        },
      }}
    />
    {props.children}
  </ThemeProvider>
);
