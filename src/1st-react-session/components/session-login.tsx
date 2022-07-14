import React from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useBehaviorSubject } from '~/1st-react-rxjs';
import { useSessionService } from '../di';
import { SessionLayout } from './session-layout';
import { SessionLoginForm, SessionLoginFormData } from './session-login-form';

export const SessionLogin: React.FC = () => {
  const sessionService = useSessionService();
  const currentToken = useBehaviorSubject(sessionService.currentToken$);

  const onSubmit = (data: SessionLoginFormData) => {
    sessionService.login(data.login, data.password);
  };

  return (
    <SessionLayout>
      <Paper>
        <Box p={4}>
          <Stack spacing={3}>
            <Typography fontSize={30} align={'center'}>
              Auth
            </Typography>
            <SessionLoginForm
              onSubmit={onSubmit}
              loading={currentToken.loading}
            />
          </Stack>
        </Box>
      </Paper>
    </SessionLayout>
  );
};
