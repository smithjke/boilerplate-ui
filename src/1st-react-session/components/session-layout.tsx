import React from 'react';
import { createUseStyles } from 'react-jss';
import { Box } from '@mui/material';

const useStyles = createUseStyles({
  SessionLayout: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SessionLayout__Container: {
    maxWidth: 400,
    flex: 1,
  },
});

export const SessionLayout: React.FC<React.PropsWithChildren> = (props) => {
  const styles = useStyles();

  return (
    <div className={styles.SessionLayout}>
      <Box px={3} className={styles.SessionLayout__Container}>
        {props.children}
      </Box>
    </div>
  );
};
