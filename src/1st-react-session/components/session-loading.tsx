import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { SessionLayout } from './session-layout';

export const SessionLoading: React.FC = () => (
  <SessionLayout>
    <Box
      display={'flex'}
      justifyContent={'center'}
    >
      <CircularProgress/>
    </Box>
  </SessionLayout>
);
