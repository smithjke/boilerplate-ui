import React from 'react';
import { Box } from '@mui/material';

export const BaseContainer: React.FC<React.PropsWithChildren> = (props) => (
  <Box px={3}>
    {props.children}
  </Box>
);
