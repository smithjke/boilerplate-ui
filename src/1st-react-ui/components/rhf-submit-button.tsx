import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';

export type RHFSubmitButtonProps = {
  form: UseFormReturn<any>;
  loading: boolean;
};

export const RHFSubmitButton: React.FC<React.PropsWithChildren<RHFSubmitButtonProps>> = (props) => (
  <Button
    type={'submit'}
    variant={'contained'}
    disabled={!props.form.formState.isValid || props.loading}
  >
    {props.loading ? (<CircularProgress size={24.5}/>) : props.children}
  </Button>
);
