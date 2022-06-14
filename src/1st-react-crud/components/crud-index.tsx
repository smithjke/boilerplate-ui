import React, { useCallback } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export type CrudIndexProps = {
  title: string;
  filters?: JSX.Element;
  list?: JSX.Element;
};

export const CrudIndex: React.FC<CrudIndexProps> = (props) => {
  const navigate = useNavigate();
  const handleCreateClick = useCallback(() => navigate('create'), []);

  return (
    <Box py={3}>
      <Stack spacing={3}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography
            fontSize={28}
            fontWeight={700}
          >
            {props.title}
          </Typography>
          <div>
            <Button
              variant={'contained'}
              onClick={handleCreateClick}
            >
              Новая заметка
            </Button>
          </div>
        </Stack>
        {props.filters && (
          <div>
            {props.filters}
          </div>
        )}
        {props.list && (
          <div>
            {props.list}
          </div>
        )}
      </Stack>
    </Box>
  );
};
