import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { CrudService } from '~/1st-crud';

export type CrudCreateProps = {
  title: string;
  crudService: CrudService<object>;
};

export const CrudCreate: React.FC<CrudCreateProps> = (props) => {
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('..'), []);

  console.log('crudService >>>', props.crudService);

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
          <Button
            variant={'contained'}
            onClick={handleBackClick}
          >
            Back
          </Button>
        </Stack>
        <div>
          FORM: create
        </div>
      </Stack>
    </Box>
  );
};
