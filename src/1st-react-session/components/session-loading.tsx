import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BaseCenterLayout } from '~/1st-react-ui';

export const SessionLoading: React.FC = () => (
  <BaseCenterLayout>
    <Box
      display={'flex'}
      justifyContent={'center'}
    >
      <CircularProgress/>
    </Box>
  </BaseCenterLayout>
);
