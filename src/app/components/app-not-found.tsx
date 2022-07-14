import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { BaseCenterLayout, BasePaperTitledBox } from '~/1st-react-ui';

export const AppNotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => navigate('/');

  return (
    <BaseCenterLayout>
      <BasePaperTitledBox title={'Not Found'}>
        <Button
          onClick={handleButtonClick}
          fullWidth
        >
          Go to main page
        </Button>
      </BasePaperTitledBox>
    </BaseCenterLayout>
  );
};
