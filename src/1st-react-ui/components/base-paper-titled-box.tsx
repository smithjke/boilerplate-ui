import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

export type BasePaperTitledBoxProps = {
  title: string;
};

export const BasePaperTitledBox: React.FC<React.PropsWithChildren<BasePaperTitledBoxProps>> = (props) => (
  <Paper>
    <Box p={4}>
      <Stack spacing={3}>
        <Typography fontSize={30} align={'center'}>
          {props.title}
        </Typography>
        <Box>
          {props.children}
        </Box>
      </Stack>
    </Box>
  </Paper>
);
