import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import * as yup from 'yup';
import { RHFSubmitButton, RHFTextField } from '~/1st-react-ui';

export type SessionLoginFormData = {
  login: string;
  password: string;
};

const schema = yup.object({
  login: yup.string()
    .trim()
    .required(),
  password: yup.string()
    .trim()
    .required(),
}).required();

export type SessionLoginFormProps = {
  onSubmit: (data: SessionLoginFormData) => void;
  loading: boolean;
};

export const SessionLoginForm: React.FC<SessionLoginFormProps> = (props) => {
  const form = useForm<SessionLoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  console.log('fff >>>', form.formState.isSubmitting);

  return (
    <form
      noValidate
      autoComplete={'off'}
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <Stack spacing={2}>
        <RHFTextField
          form={form}
          label={'Login'}
          name={'login'}
        />
        <RHFTextField
          form={form}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <Button>
          Forgot password?
        </Button>
        <RHFSubmitButton
          form={form}
          loading={props.loading}
        >
          Go
        </RHFSubmitButton>
      </Stack>
    </form>
  );
};
