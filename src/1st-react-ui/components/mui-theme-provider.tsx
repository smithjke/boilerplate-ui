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
          backgroundColor: '#E9ECEF',
          color: '#232D42',
          margin: 0,
          padding: 0,
        },
      }}
    />
    {props.children}
  </ThemeProvider>
);
