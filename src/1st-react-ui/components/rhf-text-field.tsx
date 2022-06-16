import React, { HTMLInputTypeAttribute } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TextField } from '@mui/material';

export type RHFTextFieldProps = {
  form: UseFormReturn<any>;
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
};

export const RHFTextField: React.FC<RHFTextFieldProps> = (props) => {
  return (
    <TextField
      type={props.type}
      error={Boolean(props.form.formState.errors[props.name])}
      label={props.label}
      helperText={Boolean(props.form.formState.errors[props.name]) && props.form.formState.errors[props.name].message}
      onChange={props.form.register(props.name).onChange}
      onBlur={props.form.register(props.name).onBlur}
      name={props.form.register(props.name).name}
      ref={props.form.register(props.name).ref}
    />
  );
};
