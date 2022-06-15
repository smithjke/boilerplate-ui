import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { CrudService } from '~/1st-crud';
import { usePromise } from '~/1st-react';

export type CrudEditProps = {
  title: string;
  crudService: CrudService<object>;
};

export const CrudEdit: React.FC<CrudEditProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const handleBackClick = useCallback(() => navigate('..'), []);
  console.log('params >>>', params);

  const response = usePromise(() => props.crudService.get(params.id), [params]);

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
        {response.loading && (
          <div>
            LOADING
          </div>
        )}
        {response.error && (
          <div>
            ERROR: {response.error}
          </div>
        )}
        {!response.loading && !response.error && (
          <div>
            FORM: {JSON.stringify(response.result)}
          </div>
        )}
      </Stack>
    </Box>
  );
};
